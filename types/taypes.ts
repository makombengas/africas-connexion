import { StaticImageData } from "next/image";

export interface FeatureCardProps {
    // Define any props if needed
    id: number;
    title?: string;
    description?: string;
    icon?: StaticImageData; // You can change this to a more specific type if needed
}