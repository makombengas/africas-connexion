import {query, mutation} from './_generated/server';
import {v} from 'convex/values';

// get user by userId
export const getUserByUserId = query({
  args: {userId: v.string()},
  handler: async (ctx, {userId}) => {
    if (!userId)  return null;    
    const user = await ctx.db
      .query('users')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .first();
    return user || null;
  }
});

// Create or update user (sync with Clerk)
export const createOrUpdateUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, {userId, name, email, imageUrl}) => {
    if (!userId) return null;
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .first();
    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
       
        email,
        imageUrl,
      });
    } else {
      // Create new user
      const newUser = await ctx.db.insert('users', {
        userId,
        name,
        email,
        imageUrl,
      });
      return newUser;
    }
  }
});

// search users by name or email
export const searchUsers = query({
  args: {searchTerm: v.string()},
  handler: async (ctx, {searchTerm}) => {
    if (!searchTerm) return [];
    const lowerSearchTerm = searchTerm.toLowerCase();
    const users = await ctx.db.query('users').collect();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerSearchTerm) ||
        user.email.toLowerCase().includes(lowerSearchTerm)
    )
    .slice(0, 20); // limit to 20 results
  },
});