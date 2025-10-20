import FeaturedSection from "@/components/featuredSection/FeaturedSection";
import GetInInBanner from "@/components/getInInBanner/GetInInBanner";
import SocialsProof from "@/components/socialsProof/SocialsProof";
import { Button } from "@/components/ui/button";
import Welcome from "@/components/welcome/Welcome";
import Image from "next/image";

export default function Home() {
  
  return (
<div className="">
  <Welcome />
    {/*Social proofs */}
  <SocialsProof />
  <FeaturedSection />
  <GetInInBanner />
</div>
  );
}
