import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GenerateThumbnailProps } from "@/types";

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {};

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(true)}
          className={cn("", {
            "bg-black-6": isAiThumbnail,
          })}
        >
          Generate AI thumbnail
        </Button>
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(false)}
          className={cn("", {
            "bg-black-6": !isAiThumbnail,
          })}
        >
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div>
          <div className="flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1 mt-4">
              Prompt to generate AI thumbnail
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-offset-orange-1"
              placeholder='Cover art for a podcast hosted by American comedian, presenter, and UFC color commentator Joe Rogan named "The Joe Rogan Experience"....'
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="mt-5 w-full max-w-[200px]">
            <Button
              type="submit"
              className="cursor-pointer text-16 w-full bg-orange-1 py-4 font-bold text-white-1"
              onClick={generateImage}
            >
              {isGenerating ? (
                <>
                  <Loader size={20} className="animate-spin mr-2" />
                  Loading....
                </>
              ) : (
                "Generate thumbnail"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default GenerateThumbnail;
