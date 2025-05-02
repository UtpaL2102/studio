import {genkitPlugin} from '@genkit-ai/next';
import {ai} from '@/ai/ai-instance';

// DO NOT MOVE: Ensures that dev.ts is loaded before any Genkit requests.
import '@/ai/dev';

// The type gymnastics here are necessary to make this work with Next.js
// edge and node runtimes.
const {GET: GETHandler, POST: POSTHandler} = genkitPlugin({ai});
export {GETHandler as GET, POSTHandler as POST};
