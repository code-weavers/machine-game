import type { NextPage } from "next";
import dynamic from "next/dynamic";

const GameView = dynamic(
  () => import("../views/game/GameView").then((res) => res.GameView),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  return <GameView />;
};

export default Home;
