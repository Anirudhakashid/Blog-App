import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import fileservice from "../../appwrite/fileservice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? fileservice.uploadFile(data.image[0]) : null;

      if (file) {
        fileservice.deletefile(post.featuredImage);
      }
      const dbpost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,

        if(dbpost) {
          navigate(`/post/${dbpost.$id}`);
        },
      });
    } else {
      const file = data.image[0]
        ? await fileservice.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/ /g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch(() => {
      if (name === "title") {
        setValue(
          "slug",
          slugTransform(value.title, {
            shouldValidate: true,
          })
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content: "
          name="content"
          conrol={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image:"
          type="file"
          className="mb-4"
          accept="image/png,image/jpg,image/jpeg,image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={fileservice.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full hover:bg-gray-800 hover:text-white"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
