import prisma from '@/lib/client';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function POST(req: Request) {
  console.log("Post request received");
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    console.error('Body:', body);
    console.error('Headers:', {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data
  const eventType = evt.type
  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  // console.log('Webhook body:', body)

  if (eventType === 'user.created') {
    const parsedBody = JSON.parse(body);
    try {
      await prisma.user.create({
        data: {
          id: evt.data.id,
          username: parsedBody.data.username,
          email: parsedBody.data.email_addresses[0].email_address,
          firstName: parsedBody.data.first_name,
          lastName: parsedBody.data.last_name,
          avatar: parsedBody.data.profile_image_url || "/noAvatar.png",
          cover: "/noCover.png",
          createdAt: new Date(parsedBody.data.created_at),
        },
      })
      return new Response('Successfully created a user', {status: 200})
    } catch (error: any) {
      console.error('Error ', error.toString())
      return new Response('Failed to create a user', {
        status: 500,
      })
    }
  }

  if (eventType === 'user.updated') {
    const parsedBody = JSON.parse(body);
    try {
      await prisma.user.update({
        where: {
          id: evt.data.id,
        },
        data: {
          id: evt.data.id,
          username: parsedBody.data.username,
          email: parsedBody.data.email_addresses[0].email_address,
          firstName: parsedBody.data.first_name,
          lastName: parsedBody.data.last_name,
          avatar: parsedBody.data.profile_image_url || "/noAvatar.png",
        },
      })
      return new Response('Successfully updated the user', {status: 200})
    } catch (error: any) {
      return new Response('Failed to update the user', {
        status: 500,
      })
    }
  }

  return new Response('Webhook received', { status: 200 })
}