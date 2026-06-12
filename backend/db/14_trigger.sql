create or replace function public.update_search_job_title()
 returns trigger
 language plpgsql
as $function$
  begin
  	new.search_title=
    		to_tsvector('english', new.title);
    return new;
  end
$function$;


do $$ begin if not exists ( select 1 from pg_trigger where tgname ='vector_search_update')
     then create trigger vector_search_update
      before insert or update on 
        public.jobs for each row 
        execute function update_search_job_title();
        end if; 
    end
$$;