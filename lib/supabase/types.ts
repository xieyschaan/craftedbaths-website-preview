// Database types generated from Supabase schema
// These types match the database schema exactly

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserType = 'guest' | 'registered' | 'trade' | 'wholesale'
export type QuoteStatus = 'pending' | 'sent' | 'approved' | 'rejected' | 'completed'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          parent_id: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          parent_id?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          parent_id?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          sku: string
          name: string
          description: string | null
          category_id: string | null
          brand_id: string | null
          base_price: number
          images: string[]
          specifications: Json
          dimensions: string | null
          material: string | null
          finish: string | null
          style: string | null
          features: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          name: string
          description?: string | null
          category_id?: string | null
          brand_id?: string | null
          base_price?: number
          images?: string[]
          specifications?: Json
          dimensions?: string | null
          material?: string | null
          finish?: string | null
          style?: string | null
          features?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          name?: string
          description?: string | null
          category_id?: string | null
          brand_id?: string | null
          base_price?: number
          images?: string[]
          specifications?: Json
          dimensions?: string | null
          material?: string | null
          finish?: string | null
          style?: string | null
          features?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          email: string
          user_type: UserType
          first_name: string | null
          last_name: string | null
          phone: string | null
          company: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          user_type?: UserType
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          company?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          user_type?: UserType
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          company?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pricing_tiers: {
        Row: {
          id: string
          product_id: string
          user_type: UserType
          price: number
          valid_from: string
          valid_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_type: UserType
          price: number
          valid_from?: string
          valid_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          user_type?: UserType
          price?: number
          valid_from?: string
          valid_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      showrooms: {
        Row: {
          id: string
          name: string
          address: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string | null
          phone: string | null
          email: string | null
          contact_info: Json
          booking_calendar_settings: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          phone?: string | null
          email?: string | null
          contact_info?: Json
          booking_calendar_settings?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          phone?: string | null
          email?: string | null
          contact_info?: Json
          booking_calendar_settings?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          product_id: string
          quantity: number
          price_at_added: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          product_id: string
          quantity?: number
          price_at_added: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          product_id?: string
          quantity?: number
          price_at_added?: number
          created_at?: string
          updated_at?: string
        }
      }
      quotes: {
        Row: {
          id: string
          user_id: string | null
          showroom_id: string
          items: Json
          total_amount: number
          status: QuoteStatus
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          showroom_id: string
          items: Json
          total_amount: number
          status?: QuoteStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          showroom_id?: string
          items?: Json
          total_amount?: number
          status?: QuoteStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          showroom_id: string
          date: string
          time_slot: string
          status: BookingStatus
          contact_info: Json
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          showroom_id: string
          date: string
          time_slot: string
          status?: BookingStatus
          contact_info?: Json
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          showroom_id?: string
          date?: string
          time_slot?: string
          status?: BookingStatus
          contact_info?: Json
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          short_description: string | null
          description: string | null
          featured_image: string | null
          images: string[] | null
          category: string | null
          location: string | null
          completed_date: string | null
          tags: string[] | null
          is_published: boolean
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          short_description?: string | null
          description?: string | null
          featured_image?: string | null
          images?: string[] | null
          category?: string | null
          location?: string | null
          completed_date?: string | null
          tags?: string[] | null
          is_published?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          short_description?: string | null
          description?: string | null
          featured_image?: string | null
          images?: string[] | null
          category?: string | null
          location?: string | null
          completed_date?: string | null
          tags?: string[] | null
          is_published?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          form_type: string
          name: string
          email: string
          phone: string | null
          message: string
          showroom_id: string | null
          product_id: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          form_type: string
          name: string
          email: string
          phone?: string | null
          message: string
          showroom_id?: string | null
          product_id?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          form_type?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          showroom_id?: string | null
          product_id?: string | null
          metadata?: Json
          created_at?: string
        }
      }
    }
    Views: {
      products_with_pricing: {
        Row: {
          // This view combines products with pricing tiers
          // Structure matches products table with additional pricing fields
        }
      }
    }
    Functions: {
      get_product_price: {
        Args: {
          p_product_id: string
          p_user_id?: string | null
        }
        Returns: number
      }
      calculate_cart_total: {
        Args: {
          p_user_id?: string | null
          p_session_id?: string | null
        }
        Returns: number
      }
      get_user_type: {
        Args: {
          user_uuid: string
        }
        Returns: UserType
      }
    }
  }
}

