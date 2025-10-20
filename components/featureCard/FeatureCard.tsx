import Image, { StaticImageData } from "next/image";


interface FeatureCardProps {
    // Define any props if needed
    title?: string;
    description?: string;
    icon?: StaticImageData; // You can change this to a more specific type if needed
}

const FeatureCard = ({title, description, icon}: FeatureCardProps) => {
  return (
    <div className="mb-8 group">
        <div className="p-6  border border-border rounded-lg hover:shadow-lg transition h-full justify-center items-center flex flex-col">
            <div className="text-2xl group-hover:bg-white border-2 border-gray-500 group-hover:shadow shadow-gray-500 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Image src={icon || ''} width={40} height={40} alt="icon" />
            </div>
            <h3 className="group-hover:scale-125 transition-scale ease-in-out duration-500 text-lg font-semibold mb-2">{title}</h3>
            <p className="text-center  text-muted-foreground flex-grow">{description}</p>
        </div>
    </div>
  )
}

export default FeatureCard