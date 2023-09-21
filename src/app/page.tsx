"use server";

import Header from "@/components/Header";
import Repositories from "@/components/RepoLink";
import WordCloudBlock from "@/components/WordCloud";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <Header/>

      <WordCloudBlock/>
      
      <Repositories/>
    </main>
  );
}
