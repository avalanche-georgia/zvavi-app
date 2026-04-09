create table partners (
  id             uuid primary key default gen_random_uuid(),
  name_en        text not null,
  name_ka        text,
  description_en text,
  description_ka text,
  benefit_en     text,
  benefit_ka     text,
  logo_url       text not null,
  website_url    text not null,
  tier           integer not null default 1 check (tier in (1, 2, 3)),
  is_active      boolean not null default true,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

alter table partners enable row level security;

create policy "Public can read active partners" on partners
  for select using (is_active = true);

create policy "Admins can manage partners" on partners
  for all using (auth.role() = 'authenticated');

create trigger partners_updated_at before update on partners
  for each row execute procedure update_updated_at_column();

-- Storage bucket for partner logos
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  values (
    'partner-logos',
    'partner-logos',
    true,
    524288,  -- 512 KB, matches client-side validation
    array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
  );

create policy "Public can read partner logos" on storage.objects
  for select using (bucket_id = 'partner-logos');

create policy "Admins can upload partner logos" on storage.objects
  for insert with check (bucket_id = 'partner-logos' and auth.role() = 'authenticated');

create policy "Admins can update partner logos" on storage.objects
  for update using (bucket_id = 'partner-logos' and auth.role() = 'authenticated');

create policy "Admins can delete partner logos" on storage.objects
  for delete using (bucket_id = 'partner-logos' and auth.role() = 'authenticated');

-- Seed partners
-- Note: logo_url is left empty — upload logos to the 'partner-logos' bucket via the
-- admin UI, then update each row's logo_url with the resulting public URL.
insert into partners (name_en, name_ka, description_en, description_ka, benefit_en, benefit_ka, logo_url, website_url, tier, is_active) values

-- Tier 1
(
  'Mountain Trails Agency',
  '',
  E'Mountain Trails Agency (MTA) is the Georgian government-owned company managing and developing ski resorts across Georgia — including Gudauri, Bakuriani, Goderdzi and Mestia.\nMTA ensures high-quality infrastructure, maintains ski lifts and trails, and oversees resort safety and visitor experience. Through its work, MTA plays a central role in promoting winter sports and sustainable mountain tourism in Georgia.',
  E'Mountain Trails Agency (MTA) არის საქართველოს მთავრობის საკუთრებაში არსებული კომპანია, რომელიც მართავს და ავითარებს ქვეყნის მთის კურორტებს — მათ შორის გუდაურს, ბაკურიანს, გოდერძსა და მესტიას.\nMTA უზრუნველყოფს მაღალი ხარისხის ინფრასტრუქტურას, ზრუნავს საბაგიროებისა და ტრასების მოვლაზე და კურორტის უსაფრთხოებასა და სტუმრების გამოცდილებაზე. თავისი მუშაობით MTA ცენტრალურ როლს ასრულებს ზამთრის სპორტის პოპულარიზაციასა და მდგრად მთის ტურიზმის განვითარებაში საქართველოში.',
  '',
  '',
  '',
  'https://mta.ski/',
  1,
  false
),
(
  'Vagabond Adventures',
  '',
  'Vagabond Adventures are the premier English-speaking (& German, Czech, French et al!) provider of ski/snowboard lessons, ski holiday packages & off-piste guiding at Gudauri, Georgia. With their intimate local knowledge, they also organise fantastic ski safari tours throughout the country, combining resort, off-piste & snowcat skiing with the incredible Georgian culture.',
  'Vagabond Adventures არის ინგლისურენოვანი (ასევე გერმანული, ჩეხური, ფრანგული და სხვ.) თხილამურებისა და სნოუბორდის გაკვეთილების, საგზურებისა და ოფ-პისტ გიდირების წამყვანი პროვაიდერი გუდაურში. მათი ადგილობრივი ცოდნა მათ საშუალებას აძლევს ორგანიზება გაუკეთონ საოცარ სკი-საფარი ტურებს ქვეყნის მასშტაბით, სადაც თავს იყრის კურორტი, ოფ-პისტი, ქეთ-სკი და ქართულ კულტურასთან შეხება.',
  '',
  '',
  '',
  'https://vagabondadventures.ge/',
  1,
  false
),

-- Tier 2
(
  'Bakuriani Ski Academy',
  '',
  E'Ski Bakuriani Academy - a professional ski academy in the heart of the Bakuriani resort. Skiing and snowboarding lessons for children and adults, from beginners to advanced. Experienced instructors, safe approach, individual and group lessons, equipment rental.\nAn ideal start and confident progress on the slopes of Bakuriani.',
  E'Ski Bakuriani Academy — პროფესიონალური სათხილამურო აკადემია ბაკურიანის კურორტის შუაგულში. თხილამურებითა და სნოუბორდით სრიალის სწავლება ბავშვებისა და მოზრდილებისთვის, როგორც დამწყებთათვის, ასევე მათთვის, ვისაც უკვე აქვს გამოცდილება. გამოცდილი ინსტრუქტორები, უსაფრთხო მიდგომა, ინდივიდუალური და ჯგუფური მეცადინეობები, აღჭურვილობის გაქირავება.\nიდეალური სტარტი და თავდაჯერებული პროგრესი ბაკურიანის ფერდობებზე.',
  '',
  '',
  '',
  'https://datosskola.com/',
  2,
  true
),
(
  'Drunk Cherry',
  '',
  null,
  null,
  'Up to 20% discount on selected items',
  '',
  '',
  'https://www.instagram.com/gudauri_drunkcherry/',
  2,
  true
),
(
  'Ozon Gudauri',
  '',
  'Ozon Gudauri is the riders-for-riders hotel, focused on hosting ski camps and guided groups. It is a home for passionate skiers and snowboarders built around our love to the mountains.',
  'Ozon Gudauri არის „რაიდერების სასტუმრო" — შექმნილი სნოუბორდისტებისა და თხილამურების მოყვარულებისთვის, აქცენტით სკი-ბანაკებსა და გიდირებულ ჯგუფებზე. ეს არის გარემო, რომელიც ჩვენს მთებზე სიყვარულით შეიქმნა.',
  'Up to 15% discount',
  '',
  '',
  'https://www.ozongudauri.com/',
  2,
  true
),
(
  'Popolo Pizza',
  '',
  null,
  null,
  'Up to 15% discount on selected items',
  '',
  '',
  'https://instagram.com/popolo.tbilisi',
  2,
  true
),
(
  'Snowlab Gudauri',
  '',
  E'Snowlab is a guiding team in Gudauri, Georgia, focused on safe off\u2011piste riding, skitouring and backcountry travel in the Caucasus mountains. Experienced, multilingual guides help riders find the best lines while managing avalanche risk. The team combines local terrain knowledge with modern avalanche safety practices to make powder skiing outside marked slopes more controlled and accessible.',
  E'Snowlab არის გუდაურში (საქართველო) მოქმედი გიდების გუნდი, რომელიც სპეციალიზებულია უსაფრთხო ფრირაიდში მონიშნული ტრასების გარეთ, სკიტურში და ბექქანთრი მოგზაურობაში კავკასიონის მთებში. გამოცდილი, მრავალენოვანი გიდები ეხმარებიან მოთხილამურეებს საუკეთესო ხაზების პოვნაში და ამავდროულად აკონტროლებენ ზვავსაშიშროების რისკებს. გუნდი აერთიანებს ადგილობრივი რელიეფის ღრმა ცოდნას თანამედროვე ზვავსაფრთხოების პრაქტიკებთან, რათა ტრასების გარეთ პუდრის თხილამურაობა გახდეს უფრო კონტროლირებადი და ხელმისაწვდომი.',
  '',
  '',
  '',
  'https://snow-lab.com',
  2,
  true
),

-- Tier 3
(
  'Adrenaline',
  '',
  null,
  null,
  'Up to 20% discount on selected items',
  '',
  '',
  'https://www.adrenaline.ge/',
  3,
  true
),
(
  'Buru Sports',
  '',
  null,
  null,
  'Up to 15% discount on selected items',
  '',
  '',
  'https://burusports.ge/',
  3,
  true
),
(
  'Travel Bar',
  '',
  null,
  null,
  '',
  '',
  '',
  'https://www.instagram.com/gudauribar/',
  3,
  true
),
(
  'Vitamin Kudebi',
  '',
  'A small cafe - Kudebi is Georgia''s highest cafe, located at an altitude of 3006 meters, the skiing station - Gudauri. With the most significant view on the Caucasus Mountains and special menu - fusion of Georgian and European cuisine.',
  'პატარა კაფე — კუდები არის საქართველოს ყველაზე მაღლა მდებარე კაფე, რომელიც განთავსებულია 3006 მეტრის სიმაღლეზე, სათხილამურო კურორტ გუდაურში. კაფეს აქვს შთამბეჭდავი ხედი კავკასიონის მთებზე და სპეციალური მენიუ — ქართული და ევროპული სამზარეულოს ფიუჟენი.',
  '',
  '',
  '',
  'https://www.facebook.com/vitaminkudebi',
  3,
  true
);
