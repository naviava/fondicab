interface Props {
  name: string;
  email: string;
  clerkId: string;
}

export async function POST(req: Request) {
  const { name, email, clerkId }: Props = await req.json();
}
