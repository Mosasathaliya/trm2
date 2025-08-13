'use server';

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

// Only check environment variables at runtime, not during build
if (typeof window !== 'undefined' && (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN)) {
  console.warn("Cloudflare Account ID or API Token not set - AI features may not work. Set them in Cloudflare Pages environment variables.");
}

type AiModel = 
  | '@cf/meta/llama-3-8b-instruct'
  | '@cf/meta/m2m100-1.2b'
  | '@cf/baai/bge-reranker-base'
  | '@cf/stabilityai/stable-diffusion-xl-base-1.0'
  | '@cf/myshell-ai/melotts'
  | '@cf/openai/whisper';

interface RunAiOptions {
  model: AiModel;
  inputs: object;
  stream?: boolean;
}

/**
 * A centralized function to run any Cloudflare AI model directly via the API.
 * @param model The AI model to run.
 * @param inputs The inputs for the model.
 * @param stream Whether to stream the response (for text generation).
 * @returns The model's response.
 */
export async function runAi({ model, inputs, stream = false }: RunAiOptions) {
  // Check if credentials are available
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    throw new Error("Cloudflare AI credentials are not set in the environment variables.");
  }

  const isImageOrAudio = model.includes('stable-diffusion') || model.includes('melotts') || model.includes('whisper');
  const isTextGeneration = model.includes('llama');

  const directUrl = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`;

  let body: any;
  const headers: HeadersInit = { 'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}` };

  if (model.includes('whisper') && 'audio' in inputs && (inputs.audio instanceof Buffer || inputs.audio instanceof Uint8Array)) {
    headers['Content-Type'] = 'application/octet-stream';
    body = inputs.audio;
  } else {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify({
      ...(isTextGeneration && stream ? {stream: true} : {}),
      ...inputs
    });
  }

  const response = await fetch(directUrl, {
    method: 'POST',
    headers,
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Cloudflare AI API error for model ${model}:`, errorText);
    throw new Error(`Cloudflare AI request failed: ${response.statusText}`);
  }

  if (stream) {
    return response;
  }

  if (isImageOrAudio) {
    return response;
  }

  // For non-streamed, non-binary responses, wrap in {result: ...} for consistency with previous gateway behavior
  const jsonResponse = await response.json();
  return new Response(JSON.stringify({ result: jsonResponse }), {
    headers: {'Content-Type': 'application/json'},
    status: 200
  });
}
