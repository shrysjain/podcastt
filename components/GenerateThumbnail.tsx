import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GenerateThumbnailProps } from "@/types";
import { Input } from "./ui/input";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getUrl);

  const handleImage = async (blob: Blob, filename: string) => {
    setIsImageLoading(true);
    setImage("");

    try {
      const file = new File([blob], filename, { type: "image/*" }); // is this type correct?

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);

      setIsImageLoading(false);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (e) {
      console.log(`Error handling image: ${e}`);
      toast({
        title: "Error",
        description: "Error handling image",
        variant: "destructive",
      });
    }
  };

  const generateImage = async () => {};

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));
      handleImage(blob, file.name);
    } catch (e) {
      console.log(`Error uploading image: ${e}`);
      toast({
        title: "Error",
        description: "Error uploading image",
        variant: "destructive",
      });
    }
  };

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
        <div className="flex flex-col gap-5">
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
          <div className="w-full max-w-[200px]">
            <Button
              type="submit"
              className="cursor-pointer text-16 w-full bg-orange-1 py-4 font-bold text-white-1"
              onClick={generateImage}
            >
              {isImageLoading ? (
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
        <div
          className="image_div"
          onClick={() => {
            imageRef?.current?.click();
          }}
        >
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />
          {!isImageLoading ? (
            <div className="flex align-middle">
              <Image
                src="/icons/upload-image.svg"
                alt="upload image"
                width={40}
                height={40}
                className="mr-2"
              />
              <p className="text-white-1 font-bold pt-2">Upload image</p>
            </div>
          ) : (
            <div className="text-16 flex-center font-medium text-white-1">
              <Loader size={20} className="animate-spin mr-2" />
              Uploading....
            </div>
          )}
          <p className="items-center text-gray-1">
            SVG, PNG, JPG, or GIF (up to 1080x1080 pixels)
          </p>
        </div>
      )}
      {image && (
        <div className="flex-center w-full">
          <Image
            src={image}
            alt="thumbnail"
            width={200}
            height={200}
            className="mt-5"
          />
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;
