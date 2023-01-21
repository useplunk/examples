# Sending Plunk Events from Supabase Functions

This example shows how to send events to Plunk from Supabase Functions.

## Setting up Supabase Project

```sh
supabase init
```

## Linking your Supabase project to this example

```sh
supabase link --project-ref your-project-ref
```

## Adding your Plunk API key to the secrets

```sh
supabase secrets set PLUNK_SK=key
```

## Deploying the function

```sh
supabase functions deploy function-name
```

## Triggering the function

Find the specific endpoint for your function in the Supabase dashboard. When triggering it make sure to pass in the following JSON body:

```json
{
  "event": "event-name",
  "email": "email"
}
```
