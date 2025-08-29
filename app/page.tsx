import Link from "next/link";
import { client } from "../libs/microcms";

type Props = {
  id: string;
  title: string;
};

async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: "blog",
    queries: {
      fields: "id,title",
      limit: 5,
    },
  });
  return data.contents;
}

export default async function Home() {
  const posts = await getBlogPosts();
  return (
    <main>
      <h1>ブログ一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
              {/*記事へのリンクを生成 */}
              {post.title}
              {/*タイトルを表示 */}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
