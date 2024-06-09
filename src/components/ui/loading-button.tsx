import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
    <Button size={"full"} disabled>
      <Loader2 className="mr-2 h-4 animate-spin" />
      Please wait
    </Button>
  );
}
export function Creating() {
  return (
    <Button className="mx-[32px] my-10 rounded-[8px] w-[603px] h-[43px] text-center" disabled>
      <Loader2 className="mr-2 h-4 animate-spin" />
      Creating, Please Wait!
    </Button>
  );
}
