import { useState } from "react";

import { useTranslation } from "react-i18next";

import toast from "react-hot-toast";
import { Loader } from "lucide-react";

import { cookieService } from "@/Cookies/CookiesServices";
import {
  useAcceptCommentsMutation,
  useDeleteCommentsMutation,
} from "@/app/features/Courses/CoursesApi";

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
  const [showAllComments, setShowAllComments] = useState(false);
  const [loadingAcceptId, setLoadingAcceptId] = useState<number | null>(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null);
  const [acceptComments] = useAcceptCommentsMutation();
  const [deleteComments] = useDeleteCommentsMutation();

  const displayedComments = showAllComments ? comments : comments.slice(0, 1);

  const handleAcceptComment = async (commentId: number) => {
    setLoadingAcceptId(commentId);
    try {
      await acceptComments({
        comment_id: commentId,
        token: Authtoken,
      }).unwrap();
      toast.success(t("message.comments.add"));
    } catch (err) {
      toast.error(t("message.comments.error"));
      console.error(err);
    } finally {
      setLoadingAcceptId(null);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    setLoadingDeleteId(commentId);
    try {
      await deleteComments({
        comment_id: commentId,
        token: Authtoken,
      }).unwrap();
      toast.success(t("message.comments.delete"));
    } catch (err) {
      toast.error(t("message.comments.error_delete"));
      console.error(err);
    } finally {
      setLoadingDeleteId(null);
    }
  };

  return (
    <div>
      {displayedComments?.length === 0 && (
        <div className="p-8 text-xs text-neutral-400 flex justify-center ">
          <span>{t("message.comments.noComment")}</span>
        </div>
      )}
      {displayedComments.length > 0 && (
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
                  <div className="flex justify-center gap-4 items-center ">
                    <button
                      key={comment.id}
                      type="button"
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 text-xs hover:underline px-4 py-2 rounded-lg bg-red-100/20 cursor-pointer col-span-1 w-full"
                      disabled={loadingDeleteId === comment.id}
                    >
                      {loadingDeleteId === comment.id ? (
                        <div className="animate-spin px-2 duration-200">
                          <Loader size={16} />
                        </div>
                      ) : (
                        "حذف"
                      )}
                    </button>
                    {comment.is_visible === 0 && (
                      <button
                        key={comment.id}
                        type="button"
                        onClick={() => handleAcceptComment(comment.id)}
                        className="text-primary font-medium text-xs hover:underline col-span-1 cursor-pointer px-4 py-2 rounded-lg bg-primary/20 w-full"
                        disabled={loadingAcceptId === comment.id}
                      >
                        {loadingAcceptId === comment.id ? (
                          <div className="animate-spin px-2 duration-200">
                            <Loader size={16} />
                          </div>
                        ) : (
                          "قبول"
                        )}
                      </button>
                    )}
                  </div>
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
