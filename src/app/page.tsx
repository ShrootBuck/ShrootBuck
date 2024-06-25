export default async function Home() {
  return <p>{JSON.stringify(process.env)}</p>;
}
