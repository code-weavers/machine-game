import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Game = dynamic(
  () => import("../views/initial/InitialView").then((res) => res.InitialView),
  {
    ssr: false,
  }
);

const Home: NextPage = () => <Game />;

export default Home;
