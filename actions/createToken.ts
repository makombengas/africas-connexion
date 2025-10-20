"use server"

import { serverClient } from "@/lib/streamServer";

export async function createToken(userId: string) {
  try {
    // CORRECTION: Ajout d'await ici
    const token = await serverClient.createToken(userId);
    console.log("Generated Stream token for user:", userId);
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error;
  }
}