import getRatingsForCar from "@/libs/getRatingsForCar";
import { Rating } from "interfaces";
import CommentCard from "@/components/CommentCard";
import getCar from "@/libs/getCar";
import Comment from "@/components/Comment";
import RatingCard from "@/components/RatingFilter";
import CarReviewClient from "@/components/Carreview";

export default async function CarReviewsPage({
  params,
}: {
  params: { cid: string };
}) {
  const ratingJson = await getRatingsForCar(params.cid);
  const ratings = ratingJson.data;
  const carRes = await getCar(params.cid);
  const carItem = carRes.data;

  const averageRating = ratings.length
    ? ratings.reduce((sum: number, r: Rating) => sum + r.car_rating, 0) /
      ratings.length
    : 0;

  const ratingBreakdown = ratings.reduce(
    (acc: Record<number, number>, rating: Rating) => {
      const star = Math.round(rating.car_rating);
      acc[star] = (acc[star] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  return (
    <CarReviewClient
      carName={carItem.name}
      ratings={ratings}
      averageRating={averageRating}
      breakdown={ratingBreakdown}
    />
  );
}
