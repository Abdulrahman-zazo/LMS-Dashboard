import { useState } from "react";

import { useTranslation } from "react-i18next";

import { toast } from "sonner";
import { Loader } from "lucide-react";
import {
  useAddCommentsMutation,
  useDeleteCommentsMutation,
} from "@/app/features/Comments/CommentsApi";
import { useGetuserInformationQuery } from "@/app/features/User/userApi";
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

export const Reviews = ({ comments, course_id }: ReviewsProps) => {
  const { t } = useTranslation("translation");
  const Authtoken: string = cookieService.get("auth_token") || "";
  const shouldFetch = Boolean(Authtoken); // ما نعمل query إلا إذا التوكن موجود
  const [comment, setComment] = useState<string>("");
  const [showAllComments, setShowAllComments] = useState(false);
  const { data: user } = useGetuserInformationQuery(Authtoken as string, {
    skip: !shouldFetch,
  });
  const [addComments, { isLoading: isloadingAddComment }] =
    useAddCommentsMutation();
  const [deleteComments, { isLoading: isloadingDeleteComment }] =
    useDeleteCommentsMutation();

  const displayedComments = showAllComments ? comments : comments.slice(0, 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      await addComments({
        comment_text: comment,
        course_id,
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

                  {comment.user_id === user?.user.id && (
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 text-xs hover:underline"
                      disabled={isloadingDeleteComment}
                    >
                      {isloadingDeleteComment ? "..." : "حذف"}
                    </button>
                  )}
                </div>
              </div>

              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                {comment.comment_text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm text-gray-900 mb-4">
          {t("Courses_card.add_comments")}
        </h3>
        <div className="flex space-x-4">
          {/* من معلومات اليوزر  */}
          <img
            className="h-10 w-10 object-cover rounded-full"
            src={user?.user.image} // Placeholder for current user's avatar
            alt="Your avatar"
          />
          <form onSubmit={handleSubmit} className="flex-1">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary/50 resize-y placeholder:text-[10px] placeholder:sm:text-xs placeholder:font-light placeholder:text-neutral-400"
              rows={3}
              placeholder={t("Courses_card.comments_placeholder")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={200} // مثلاً كل سطر 100 حرف → سطرين = 200 حرف
              style={{ resize: "none" }} // يمنع المستخدم من التوسعة
            />

            <button
              disabled={!comment.trim()}
              type="submit"
              className={`mt-3 float-right  w-full text-white text-sm py-2 px-6 rounded-md hover:bg-primary/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 ${
                !comment.trim()
                  ? "bg-primary/70 cursor-not-allowed"
                  : "bg-primary cursor-pointer "
              }`}
            >
              {isloadingAddComment ? (
                <span className="flex justify-center">
                  <Loader
                    size={20}
                    className="animate-spin animate-duration-[1500ms]"
                  />
                </span>
              ) : (
                t("Courses_card.send")
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
