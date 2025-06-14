import { useState } from "react";

import { useTranslation } from "react-i18next";

import { toast } from "sonner";
import { Loader } from "lucide-react";
import {
  useAcceptCommentsMutation,
  useDeleteCommentsMutation,
} from "@/app/features/Comments/CommentsApi";

import { cookieService } from "@/Cookies/CookiesServices";

// course interface
export interface IComments {
  id: number;
  comment_text: string;
  course_id?: number;
  author: string; // صاحب التعليق
  avatar: string;
  user_id?: number;
  time: string;
  is_visible: number;
}
interface ReviewsProps {
  comments: IComments[];
  course_id: number;
}

export const Reviews = ({ comments }: ReviewsProps) => {
  const { t } = useTranslation("translation");
  const Authtoken: string = cookieService.get("auth_token") || "";
  const [comment, setComment] = useState<string>("");
  const [showAllComments, setShowAllComments] = useState(false);

  const [acceptComments, { isLoading: isloadingAddComment }] =
    useAcceptCommentsMutation();
  const [deleteComments, { isLoading: isloadingDeleteComment }] =
    useDeleteCommentsMutation();

  const displayedComments = showAllComments ? comments : comments.slice(0, 1);

  const handleSubmit = async (commentId: number) => {
    try {
      await acceptComments({
        comment_id: commentId,
        token: Authtoken,
      }).unwrap();

      toast.success(t("message.comments.add"));
      setComment("");
    } catch (err) {
      toast.error(t("message.comments.error"));
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComments({
        comment_id: commentId,
        token: Authtoken,
      }).unwrap();
      toast.success(t("message.comments.delete"));
    } catch (err) {
      toast.error(t("message.comments.error_delete"));
      console.error(err);
    }
  };
  return (
    <div>
      {displayedComments?.length > 1 && (
        <div className="flex justify-center mb-4">
          <button
            title="Courses_card.showAll"
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-primary hover:text-primary/50 font-medium text-xs sm:text-sm"
          >
            {showAllComments
              ? t("Courses_card.showless")
              : t("Courses_card.showAll")}
          </button>
        </div>
      )}
      <div className="space-y-6">
        {displayedComments?.map((comment: IComments) => (
          <div key={comment.id} className="flex space-x-4">
            <img
              loading="lazy"
              className="h-10 w-10 object-cover rounded-full"
              src={comment.avatar}
              alt={`${comment.author}'s avatar`}
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm md:text-base font-medium text-gray-900">
                  {comment.author}
                </p>
                <div className="flex gap-2 items-center">
                  <p className="text-xs sm:text-sm text-gray-500">
                    {/* {getTimeAgo(comment.time)} */}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 text-xs hover:underline"
                    disabled={isloadingDeleteComment}
                  >
                    {isloadingDeleteComment ? "..." : "حذف"}
                  </button>
                </div>
              </div>

              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                {comment.comment_text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
