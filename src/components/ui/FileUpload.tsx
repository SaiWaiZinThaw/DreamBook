import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FileUpload() {
  return (
    <div className="flex items-center gap-3 max-w-sm">
      <Input
        id="picture"
        type="file"
        className="rounded-full w-[100px] h-[100px] text-white"
      />
      <Label htmlFor="picture" className="font-Inter text-white">
        Upload Photo
      </Label>
    </div>
  );
}
