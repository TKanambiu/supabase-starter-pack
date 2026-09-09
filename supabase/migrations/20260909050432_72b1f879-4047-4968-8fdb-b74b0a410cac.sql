CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

ALTER POLICY "Admins can manage products" ON public.products
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can delete any comment" ON public.article_comments
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Approved authors can insert their own articles" ON public.articles
  WITH CHECK ((auth.uid() = author_id) AND (private.has_role(auth.uid(), 'author'::public.app_role) OR private.has_role(auth.uid(), 'admin'::public.app_role)));
ALTER POLICY "Admins can delete subscribers" ON public.subscribers
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can view subscribers" ON public.subscribers
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can grant roles" ON public.user_roles
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can revoke roles" ON public.user_roles
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can view all roles" ON public.user_roles
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can view visit logs" ON public.visit_logs
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins manage product images" ON storage.objects
  USING ((bucket_id = 'product-images'::text) AND private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK ((bucket_id = 'product-images'::text) AND private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Approved authors can upload article covers" ON storage.objects
  WITH CHECK ((bucket_id = 'article-covers'::text) AND (private.has_role(auth.uid(), 'author'::public.app_role) OR private.has_role(auth.uid(), 'admin'::public.app_role)));

CREATE OR REPLACE FUNCTION public.list_users_for_admin()
RETURNS TABLE(id uuid, display_name text, email text, created_at timestamptz, last_sign_in_at timestamptz, roles text[])
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT private.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'not authorized';
  END IF;
  RETURN QUERY SELECT * FROM public.admin_user_list ORDER BY created_at DESC;
END;
$$;

ALTER FUNCTION public.has_role(uuid, public.app_role) SECURITY INVOKER;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;