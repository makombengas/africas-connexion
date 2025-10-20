import { FeatureCardProps } from "@/types/taypes";
import user from "@/public/images/icons/group.png"
import  circle from "@/public/images/icons/circle.png"
import  shield from "@/public/images/icons/shield.png"
import   video  from "@/public/images/icons/video.png"
import   zap from "@/public/images/icons/zap.png"

export const featureCard: FeatureCardProps[] = [
    {
        id:0,
        title: "Instant Messaging",
        description: "Connect with community members in real-time through our secure messaging platform.",
        icon: circle,
    },
    {
        id:1,
        title: "HD Video Calls",
        description: "Host high-quality video calls and virtual meetings with ease.",
        icon: video,
    },
    {
        id:2,
        title: "Privacy & Security",
        description: "Crypted messaging and secure data storage to protect your information.",
        icon: shield
        } ,
    {
        id:3,
        title: "Networking Tools",
        description: "Connect with like-minded individuals and grow your professional network.",
        icon: shield,
    },
    {
        id:4,
        title: "Group Chats",
        description: "Create and manage group chats for team collaboration and community discussions.",
        icon: user,
    } ,
    {
        id:5,
        title: "Fast Performance",
        description: "Experience lightning-fast load times and seamless navigation across the platform.",
        icon: zap,
    }
    ];