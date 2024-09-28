import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Environment } from '@environment/environment';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor() { }

  getClient() {
    if (this.client) return this.client;

    this.client = createClient(
      Environment.Instance.SUPABASE_URL,
      Environment.Instance.SUPABASE_SECRET_KEY,
      { auth: { autoRefreshToken: true, detectSessionInUrl: false } },
    );
    return this.client;
  }

  public async getTextFile(bucket: string, filename: string): Promise<string> {
    const client = this.getClient();

    const { data, error } = await client.storage.from(bucket).download(filename);

    if (error) {
      throw error;
    }

    const text = await data.text();

    return text;
  }

}
