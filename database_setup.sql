--
-- PostgreSQL database dump
--

\restrict lcIhcJyIfmaCkKAwHbVCDTtmpmEbCPIhmKVeM2Nzb3Kaoxm4yQZAzmlcNuQfFqo

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-01-14 20:09:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: app_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.app_user (
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    CONSTRAINT chk_role_values CHECK (((role)::text = ANY (ARRAY[('USER'::character varying)::text, ('ADMIN'::character varying)::text])))
);


ALTER TABLE public.app_user OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: app_user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.app_user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.app_user_user_id_seq OWNER TO postgres;

--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 219
-- Name: app_user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.app_user_user_id_seq OWNED BY public.app_user.user_id;


--
-- TOC entry 222 (class 1259 OID 16405)
-- Name: locker_location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locker_location (
    location_id integer NOT NULL,
    address character varying(255) NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.locker_location OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16416)
-- Name: locker_space; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locker_space (
    space_id integer NOT NULL,
    location_id integer NOT NULL,
    size character varying(20) NOT NULL,
    available boolean NOT NULL,
    active boolean DEFAULT true,
    CONSTRAINT chk_size_values CHECK (((size)::text = ANY ((ARRAY['SMALL'::character varying, 'MEDIUM'::character varying, 'LARGE'::character varying])::text[])))
);


ALTER TABLE public.locker_space OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16460)
-- Name: available_locker_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.available_locker_view AS
 SELECT ll.location_id,
    ll.address,
    ll.latitude,
    ll.longitude,
    ls.space_id,
    ls.size
   FROM (public.locker_location ll
     JOIN public.locker_space ls ON ((ll.location_id = ls.location_id)))
  WHERE (ls.available = true);


ALTER VIEW public.available_locker_view OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16404)
-- Name: locker_location_location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locker_location_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locker_location_location_id_seq OWNER TO postgres;

--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 221
-- Name: locker_location_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locker_location_location_id_seq OWNED BY public.locker_location.location_id;


--
-- TOC entry 223 (class 1259 OID 16415)
-- Name: locker_space_space_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locker_space_space_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locker_space_space_id_seq OWNER TO postgres;

--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 223
-- Name: locker_space_space_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locker_space_space_id_seq OWNED BY public.locker_space.space_id;


--
-- TOC entry 226 (class 1259 OID 16433)
-- Name: reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservation (
    reservation_id integer NOT NULL,
    user_id integer NOT NULL,
    space_id integer NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    access_code character varying(50) NOT NULL,
    expired boolean DEFAULT false
);


ALTER TABLE public.reservation OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16432)
-- Name: reservation_reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservation_reservation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservation_reservation_id_seq OWNER TO postgres;

--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 225
-- Name: reservation_reservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservation_reservation_id_seq OWNED BY public.reservation.reservation_id;


--
-- TOC entry 4875 (class 2604 OID 16393)
-- Name: app_user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user ALTER COLUMN user_id SET DEFAULT nextval('public.app_user_user_id_seq'::regclass);


--
-- TOC entry 4876 (class 2604 OID 16408)
-- Name: locker_location location_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locker_location ALTER COLUMN location_id SET DEFAULT nextval('public.locker_location_location_id_seq'::regclass);


--
-- TOC entry 4878 (class 2604 OID 16419)
-- Name: locker_space space_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locker_space ALTER COLUMN space_id SET DEFAULT nextval('public.locker_space_space_id_seq'::regclass);


--
-- TOC entry 4880 (class 2604 OID 16436)
-- Name: reservation reservation_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation ALTER COLUMN reservation_id SET DEFAULT nextval('public.reservation_reservation_id_seq'::regclass);


--
-- TOC entry 5048 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.app_user (user_id, name, email, password, role) FROM stdin;
1	System Admin	admin@lockin.com	admin_pwd_hash	ADMIN
2	Tourist User	user@lockin.com	user_pwd_hash	USER
3	Test User	test@example.com	$2a$10$LEbY6RPqDGuZEd0WRUrOduMiLbf2YRZQ.osPkYzUYlY4Gdbo1YJRW	USER
4	jane doe	jane@email.com	$2a$10$UsgH./nJVlT6S5l/V4vYyO.v.pFMjawEI8op5edwXX6adnrCKn29C	USER
5	Jane Doe 	doe@email.com	$2a$10$GAWC26kOzo4fAQvCB5jodu1wgxWVBK4N2m/JA1Zti0Z26tCkmedkO	USER
6	Admin	admin@gmail.com	$2a$10$.MKdgyedG9mnpuw/Kjr/we26wCb.ta4VknkSMztqezLzOG4rEwqkK	ADMIN
7	User Name	email@address.com	$2a$10$A90Nn7awxaUzFlrlr9LRdOjDadOwxd0rP82HFX5P/WAuBziqueAB6	USER
8	Another Test 	miau@gmail.com	$2a$10$efS4bo4A2Oa66bt.xzlkW.BxGuak7a6m5DJOW9tuQrbOISjfgUtCa	USER
9	Miau Miau	miau@miau.com	$2a$10$eg3.lIvU8Y3LE0psLUromeUYI1lHj77rKhsqRI20O2XQcJBOOsh3m	USER
10	Miau	miau@email.com	$2a$10$AQoCyrNRXAoD0wkXj0tcbOLGWV2hpwru6gqAmvLoM4Cn/CGjbT97a	USER
11	Test	test@test.com	$2a$10$iFC7N/MLeRUmpuzu/A1bDusGvLz1LSEePsRL/Jve7A6Wvf3u5WCtC	USER
12	Darius	muntean@email.com	$2a$10$J6xXOW1BzwGHVHSoeMw1S.f6HJmVRoZcp1PGPGZn0ON/qeIKW/DyG	USER
13	Ion Popescu	ionp@gmail.com	HASHED_PASSWORD1	USER
14	John Smith	john@gmail.com	$2a$10$c.NOaBV4tBW.8NPxLV1IMO5tWgVt2MkIRAqvKkr7B70R88nuPZfMa	USER
15	John Smith	john@email.com	$2a$10$YvPt3.lTEQ4DVoph45W4b.BOOV8dyYvj4QKzGnYdToRa5eRISWdx2	USER
16	Acc	acc@email.com	$2a$10$t/3Yxr/TstwExGI.82.Dguh9uJ.k7TcimXNkWishGF312Q2PJqoG2	USER
17	name	name@email.com	$2a$10$E5gLc6SKs07P07QemYVzIuRlHF09jzbRpVB6XP1zB53.0kAMZ9mhC	USER
\.


--
-- TOC entry 5050 (class 0 OID 16405)
-- Dependencies: 222
-- Data for Name: locker_location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locker_location (location_id, address, latitude, longitude, active) FROM stdin;
1	Piata Victoriei, Timisoara 	45.75363092362698	21.225698925554752	f
3	i will delete this test	45.72211301864568	21.264810897409912	f
4	Piata Unirii, Timisoara	45.75791532012955	21.228800565004345	t
2	Iulius Town, Timisoara	45.7658512	21.2286246	t
5	Sud Plaza, Timisoara	45.7303149	21.2476907	t
6	Shopping City Timisoara	45.7246565	21.1986958	t
7	UVT Timisoara	45.7473293	21.231261	t
8	Mock Location to delete	45.747842781673924	21.20787799358368	f
9	mock loaction 	45.73221477223807	21.243921518325806	f
10	miau	45.74578902962984	21.20428215712309	f
11	miau	45.743824113875576	21.218845881521702	f
12	miau	45.747397785080196	21.231736913323402	f
13	miau	45.745043829783455	21.236224919557575	f
14	test	45.743036303151946	21.219567731022835	f
15	Piata Libertatii	45.7556773	21.227297	f
16	Piata Victoriei	45.7526802	21.2254959	f
18	Piata 700, Timisoara	45.7564045	21.2226772	t
17	Hotel Continental	45.7550141	21.2324075	f
\.


--
-- TOC entry 5052 (class 0 OID 16416)
-- Dependencies: 224
-- Data for Name: locker_space; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locker_space (space_id, location_id, size, available, active) FROM stdin;
1	1	SMALL	t	t
3	1	LARGE	t	t
29	7	SMALL	f	t
2	1	MEDIUM	t	t
7	2	SMALL	t	f
4	2	SMALL	t	f
8	2	MEDIUM	t	f
5	2	MEDIUM	t	f
10	3	SMALL	t	t
11	3	MEDIUM	t	t
6	2	LARGE	t	t
9	2	LARGE	t	t
12	2	MEDIUM	t	t
41	11	SMALL	t	f
42	11	MEDIUM	t	f
52	15	SMALL	t	f
54	15	LARGE	t	f
53	15	MEDIUM	t	f
15	4	MEDIUM	t	t
16	4	LARGE	t	t
18	2	MEDIUM	t	t
19	2	LARGE	t	t
20	4	MEDIUM	t	t
21	4	LARGE	t	t
22	4	SMALL	t	t
23	5	SMALL	t	t
24	5	MEDIUM	t	t
25	5	LARGE	t	t
44	12	MEDIUM	t	f
13	2	SMALL	t	t
46	12	SMALL	t	f
26	6	SMALL	t	t
27	6	MEDIUM	t	t
28	6	LARGE	t	t
14	4	SMALL	t	t
31	7	LARGE	t	t
43	12	SMALL	t	f
45	12	LARGE	t	f
32	8	SMALL	t	f
47	13	SMALL	t	f
34	9	MEDIUM	t	f
33	9	SMALL	t	f
48	13	MEDIUM	t	f
56	16	MEDIUM	t	f
35	10	SMALL	t	f
36	10	MEDIUM	t	f
37	10	LARGE	t	f
38	10	SMALL	t	f
39	10	MEDIUM	t	f
40	10	LARGE	t	f
57	16	LARGE	t	f
55	16	SMALL	t	f
17	2	SMALL	t	t
61	18	SMALL	t	t
62	18	MEDIUM	t	t
63	18	LARGE	t	t
60	17	LARGE	t	f
59	17	MEDIUM	t	f
58	17	SMALL	t	f
30	7	MEDIUM	t	t
49	14	SMALL	t	f
51	14	LARGE	t	f
50	14	MEDIUM	t	f
\.


--
-- TOC entry 5054 (class 0 OID 16433)
-- Dependencies: 226
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservation (reservation_id, user_id, space_id, start_time, end_time, access_code, expired) FROM stdin;
33	15	55	2026-01-10 23:55:16.920796+02	2026-01-10 23:55:23.662206+02	84723738	t
32	15	30	2026-01-10 23:52:55.290033+02	2026-01-11 03:52:55.290033+02	08151895	t
34	16	30	2026-01-12 10:38:24.852107+02	2026-01-12 12:38:24.852107+02	28178704	t
37	4	17	2026-01-12 11:04:10.521215+02	2026-01-12 12:04:10.521215+02	74820920	t
36	4	58	2026-01-12 11:02:38.590143+02	2026-01-12 16:02:38.590143+02	15463328	t
35	16	59	2026-01-12 10:43:10.662998+02	2026-01-12 11:31:36.677247+02	10418276	t
38	4	30	2026-01-12 11:30:07.875288+02	2026-01-12 14:30:07.875288+02	31264235	t
\.


--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 219
-- Name: app_user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.app_user_user_id_seq', 17, true);


--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 221
-- Name: locker_location_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locker_location_location_id_seq', 18, true);


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 223
-- Name: locker_space_space_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locker_space_space_id_seq', 63, true);


--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 225
-- Name: reservation_reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservation_reservation_id_seq', 38, true);


--
-- TOC entry 4885 (class 2606 OID 16465)
-- Name: app_user app_user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_email_key UNIQUE (email);


--
-- TOC entry 4887 (class 2606 OID 16401)
-- Name: app_user app_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4889 (class 2606 OID 16414)
-- Name: locker_location locker_location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locker_location
    ADD CONSTRAINT locker_location_pkey PRIMARY KEY (location_id);


--
-- TOC entry 4891 (class 2606 OID 16426)
-- Name: locker_space locker_space_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locker_space
    ADD CONSTRAINT locker_space_pkey PRIMARY KEY (space_id);


--
-- TOC entry 4893 (class 2606 OID 16449)
-- Name: reservation reservation_access_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_access_code_key UNIQUE (access_code);


--
-- TOC entry 4895 (class 2606 OID 16445)
-- Name: reservation reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (reservation_id);


--
-- TOC entry 4896 (class 2606 OID 16427)
-- Name: locker_space fk_location; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locker_space
    ADD CONSTRAINT fk_location FOREIGN KEY (location_id) REFERENCES public.locker_location(location_id) ON DELETE CASCADE;


--
-- TOC entry 4897 (class 2606 OID 16455)
-- Name: reservation fk_space; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_space FOREIGN KEY (space_id) REFERENCES public.locker_space(space_id) ON DELETE RESTRICT;


--
-- TOC entry 4898 (class 2606 OID 16450)
-- Name: reservation fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.app_user(user_id) ON DELETE RESTRICT;


-- Completed on 2026-01-14 20:09:38

--
-- PostgreSQL database dump complete
--

\unrestrict lcIhcJyIfmaCkKAwHbVCDTtmpmEbCPIhmKVeM2Nzb3Kaoxm4yQZAzmlcNuQfFqo

