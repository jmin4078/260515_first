import { useEffect, useMemo, useState } from "react";

const SUPABASE_URL = "https://etomsinirscywqvyyjiv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0b21zaW5pcnNjeXdxdnl5aml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NDQ4NDcsImV4cCI6MjA5NjIyMDg0N30.GnbWzZZQaL2XdPkEavBsbzjx5DEZeAvosMGFVBEEYnA";
const TOUR_API_KEY = "fc0473798b6ff362f174aaf5c331fff62d6caaa8a13ba15c7bb9a89bc2127e91";
const KAKAO_JAVASCRIPT_KEY = "0d5bf3f5f8c9117108fceeb1a79d8935";

const PROVINCES = ["서울특별시", "인천광역시", "대전광역시", "대구광역시", "광주광역시", "부산광역시", "울산광역시", "세종특별자치시", "경기도", "강원도", "충청북도", "충청남도", "경상북도", "경상남도", "전라북도", "전라남도", "제주특별자치도"];
const AREA_CODES = { "서울특별시": "1", "인천광역시": "2", "대전광역시": "3", "대구광역시": "4", "광주광역시": "5", "부산광역시": "6", "울산광역시": "7", "세종특별자치시": "8", "경기도": "31", "강원도": "32", "충청북도": "33", "충청남도": "34", "경상북도": "35", "경상남도": "36", "전라북도": "37", "전라남도": "38", "제주특별자치도": "39" };
const COMPANION_TYPES = ["혼자", "친구", "연인", "가족"];
const KEYWORDS = ["자연", "맛집", "역사", "카페", "액티비티", "힐링", "사진", "전통"];
const DEFAULT_POSTS = [
  { id: 1, author: "제주 여행자", time: "2시간 전", title: "제주 3박 4일 코스 공유", excerpt: "성산일출봉부터 우도까지 바다 뷰 위주로 다녀온 일정입니다.", tags: ["제주", "맛집", "오름"], likes: 142, comments: 38, emoji: "🏝️" },
  { id: 2, author: "부산 러버", time: "5시간 전", title: "부산 감성 카페 여행", excerpt: "해운대 주변에서 카페와 바다를 함께 즐긴 일정입니다.", tags: ["부산", "카페", "해변"], likes: 89, comments: 21, emoji: "🌊" },
  { id: 3, author: "경주 덕후", time: "1일 전", title: "경주 역사 여행 후기", excerpt: "불국사와 첨성대, 황리단길까지 도보 위주로 돌 수 있는 코스였습니다.", tags: ["경주", "문화", "역사"], likes: 203, comments: 55, emoji: "🏛️" },
];

const css = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, sans-serif; background: #f4f7f5; color: #1a2b1f; }
  button, input, select, textarea { font: inherit; }
  .app { display: flex; min-height: 100vh; }
  .sidebar { width: 240px; background: #1a5c3a; color: #fff; padding: 24px 0; position: fixed; inset: 0 auto 0 0; }
  .sidebar h1 { font-size: 22px; margin: 0 24px 18px; }
  .nav-item { padding: 12px 24px; cursor: pointer; color: rgba(255,255,255,.8); }
  .nav-item.active, .nav-item:hover { background: rgba(255,255,255,.08); color: #fff; }
  .main { margin-left: 240px; width: calc(100% - 240px); }
  .topnav { height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; background: #fff; border-bottom: 1px solid #dfe7e1; position: sticky; top: 0; z-index: 10; }
  .section { padding: 24px; max-width: 1100px; }
  .hero, .card, .feed-card, .trip-card, .panel { background: #fff; border: 1px solid #dfe7e1; border-radius: 16px; box-shadow: 0 2px 14px rgba(0,0,0,.04); }
  .hero { padding: 32px; background: linear-gradient(135deg, #1a5c3a, #2d7a52); color: #fff; }
  .hero h2 { margin: 0 0 8px; font-size: 34px; }
  .btn { border: 0; border-radius: 12px; padding: 10px 16px; cursor: pointer; }
  .btn-primary { background: #1a5c3a; color: #fff; }
  .btn-secondary { background: #e8f5ee; color: #1a5c3a; }
  .btn-ghost { background: transparent; border: 1px solid #c9d6cf; }
  .grid { display: grid; gap: 16px; }
  .dest-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
  .quick-grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 16px; }
  .quick-card, .feed-card, .card, .trip-card, .panel { padding: 16px; }
  .form-input { width: 100%; padding: 11px 12px; border: 1px solid #c9d6cf; border-radius: 12px; background: #fff; }
  .form-group { margin-bottom: 14px; }
  .form-label { display: block; margin-bottom: 6px; font-size: 13px; color: #4a6155; }
  .input-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .chip-row, .feed-actions { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { border: 1px solid #c9d6cf; background: #fff; border-radius: 999px; padding: 8px 12px; cursor: pointer; }
  .chip.selected { background: #1a5c3a; color: #fff; border-color: #1a5c3a; }
  .dest-img { width: 100%; height: 180px; object-fit: cover; border-radius: 12px; background: #eef2ee; }
  .badge { display: inline-block; background: #e8f5ee; color: #1a5c3a; padding: 4px 10px; border-radius: 999px; font-size: 12px; }
  .empty, .loading { padding: 40px; text-align: center; }
  .spinner { width: 30px; height: 30px; border: 3px solid #dfe7e1; border-top-color: #1a5c3a; border-radius: 50%; margin: 0 auto 12px; animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .alert { padding: 12px 14px; border-radius: 12px; background: #fef7e0; border: 1px solid #f7d56b; color: #8a6500; }
  .feed-card { margin-bottom: 16px; overflow: hidden; }
  .feed-hero { height: 180px; background: #e8f5ee; display: flex; align-items: center; justify-content: center; font-size: 56px; }
  .avatar { width: 34px; height: 34px; border-radius: 50%; background: #1a5c3a; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; }
`;

const sb = {
  async fetchJson(url, options = {}) {
    const r = await fetch(url, options);
    let data = null;
    try { data = await r.json(); } catch { data = null; }
    return { ok: r.ok, status: r.status, data };
  },
  async signUp(email, password, nickname) {
    const { data } = await this.fetchJson(`${SUPABASE_URL}/auth/v1/signup`, { method: "POST", headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY }, body: JSON.stringify({ email, password, data: { nickname } }) });
    return data;
  },
  async signIn(email, password) {
    const { data } = await this.fetchJson(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, { method: "POST", headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY }, body: JSON.stringify({ email, password }) });
    return data;
  },
  async signOut(token) { await fetch(`${SUPABASE_URL}/auth/v1/logout`, { method: "POST", headers: { Authorization: `Bearer ${token}`, apikey: SUPABASE_ANON_KEY } }); },
  async getUser(token) { const { data } = await this.fetchJson(`${SUPABASE_URL}/auth/v1/user`, { headers: { Authorization: `Bearer ${token}`, apikey: SUPABASE_ANON_KEY } }); return data; },
  async select(table, query, token) { const { data } = await this.fetchJson(`${SUPABASE_URL}/rest/v1/${table}?${query}`, { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token || SUPABASE_ANON_KEY}` } }); return data; },
  async upsert(table, data, token) { const { data: res } = await this.fetchJson(`${SUPABASE_URL}/rest/v1/${table}`, { method: "POST", headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}`, Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(data) }); return res; },
  async del(table, filter, token) { const { data } = await this.fetchJson(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, { method: "DELETE", headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}`, Prefer: "return=representation" } }); return data; },
};

async function fetchTourSpots({ areaCode = "39", keyword = "", numOfRows = 12 } = {}) {
  try {
    const params = new URLSearchParams({ serviceKey: TOUR_API_KEY, numOfRows: String(numOfRows), pageNo: "1", MobileOS: "ETC", MobileApp: "TripAI", _type: "json", listYN: "Y", arrange: "Q", areaCode, contentTypeId: "12" });
    const r = await fetch(`https://apis.data.go.kr/B551011/KorService1/areaBasedList1?${params.toString()}`);
    const d = await r.json();
    const items = d?.response?.body?.items?.item || [];
    const list = Array.isArray(items) ? items : items ? [items] : [];
    if (keyword && list.length === 0) return await fetchTourKeyword(keyword, numOfRows);
    return list;
  } catch {
    if (keyword) return await fetchTourKeyword(keyword, numOfRows);
    return [];
  }
}

async function fetchTourKeyword(keyword, numOfRows = 12) {
  try {
    const params = new URLSearchParams({ serviceKey: TOUR_API_KEY, numOfRows: String(numOfRows), pageNo: "1", MobileOS: "ETC", MobileApp: "TripAI", _type: "json", listYN: "Y", arrange: "Q", keyword });
    const r = await fetch(`https://apis.data.go.kr/B551011/KorService1/searchKeyword1?${params.toString()}`);
    const d = await r.json();
    const items = d?.response?.body?.items?.item || [];
    return Array.isArray(items) ? items : items ? [items] : [];
  } catch { return []; }
}

function dedupeSpots(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.title || item.destination_name || item.name || item.addr1 || JSON.stringify(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function rankSpots(items, keywords) {
  return items.map((s) => {
    const text = `${s.title || s.destination_name || ""} ${s.overview || s.description || ""} ${s.addr1 || s.addr2 || ""}`.toLowerCase();
    const hits = keywords.reduce((n, k) => n + (text.includes(k.toLowerCase()) ? 1 : 0), 0);
    return {
      destination_name: s.title || s.destination_name || s.name || "여행지",
      province: s.province || (s.addr1 ? s.addr1.split(" ")[0] : ""),
      city: s.city || "",
      description: s.overview || s.description || "",
      image_url: s.firstimage || s.image_url || "",
      raw: s,
      score: hits * 20 + (s.firstimage || s.image_url ? 8 : 0) + Math.random() * 3,
    };
  }).sort((a, b) => b.score - a.score);
}

function buildItinerary(rec, daysCount, userPref) {
  const first = rec.raw || rec;
  const startTime = userPref?.travel_tempo === "active" ? "08:00" : "10:00";
  const lunchDesc = userPref?.food_preference === "popular" ? "유명한 맛집 위주로 점심을 즐깁니다." : "현지에서 사랑받는 식당을 찾아갑니다.";
  return Array.from({ length: daysCount }, (_, idx) => ({
    day: idx + 1,
    items: [
      { time: startTime, placeName: rec.destination_name, description: first.overview || first.description || `${rec.destination_name} 중심의 여행입니다.` },
      { time: "12:30", placeName: "점심 식사", description: lunchDesc },
      { time: "14:00", placeName: "주변 관광지", description: `${rec.destination_name} 주변의 볼거리와 사진 명소를 둘러봅니다.` },
      { time: "18:00", placeName: "저녁/휴식", description: "저녁 식사 후 숙소로 이동합니다." },
    ],
  }));
}

async function loadDestinationDetails(token) {
  const data = await sb.select("destinations", "order=created_at.desc", token);
  return Array.isArray(data) ? data : [];
}

function Sidebar({ page, onNav, user, badge, onLogout }) {
  const nick = user?.user_metadata?.nickname || user?.email?.split("@")[0] || "여행자";
  const initial = nick[0]?.toUpperCase() || "T";
  const items = [["home", "홈"], ["explore", "여행지"], ["plan", "여행 계획"], ["trips", "일정"], ["community", "커뮤니티"], ["mypage", "마이페이지"]];
  return <aside className="sidebar"><h1>Trip AI</h1>{items.map(([id, label]) => <div key={id} className={`nav-item${page === id ? " active" : ""}`} onClick={() => onNav(id)}>{label}</div>)}<div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}><div style={{ display: "flex", gap: 10, alignItems: "center" }}><div className="avatar">{initial}</div><div><div>{nick}</div><div style={{ fontSize: 12, opacity: 0.7 }}>{badge || "선호도 미설정"}</div></div></div><button className="btn btn-secondary" style={{ width: "100%", marginTop: 12 }} onClick={onLogout}>로그아웃</button></div></aside>;
}

function DestCard({ dest }) {
  return <div className="card">{dest.image_url ? <img className="dest-img" src={dest.image_url} alt={dest.destination_name} /> : <div className="dest-img" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42 }}>🧭</div>}<div style={{ marginTop: 12 }}><div className="badge">{dest.province || "국내"}</div><h3>{dest.destination_name}</h3><p>{(dest.description || "국내 여행지").slice(0, 90)}</p></div></div>;
}

function TripCard({ trip }) {
  return <div className="trip-card" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}><div style={{ fontSize: 28 }}>🧳</div><div style={{ flex: 1 }}><strong>{trip.title}</strong><div style={{ fontSize: 13, color: "#4a6155" }}>{trip.start_date} ~ {trip.end_date} · {trip.companion_type || "여행"}</div></div><div className="badge">{trip.status || "계획"}</div></div>;
}

function HomePage({ onNav, user, badge, trips, destinations }) {
  const nick = user?.user_metadata?.nickname || "여행자";
  return <div className="section"><div className="hero"><div style={{ opacity: 0.8, marginBottom: 8 }}>안녕하세요, {nick}님</div><h2>취향에 맞는 여행을 AI가 도와드려요</h2><p>여행지 사진은 Supabase destinations 테이블 또는 Tour API 응답의 image_url/firstimage를 사용합니다.</p>{badge && <div className="badge" style={{ marginTop: 12 }}>{badge}</div>}<div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}><button className="btn btn-primary" onClick={() => onNav("plan")}>여행 계획 시작</button><button className="btn btn-secondary" onClick={() => onNav("explore")}>여행지 둘러보기</button></div></div><div className="grid quick-grid">{[["plan", "일정 생성"], ["explore", "여행지 검색"], ["trips", "내 일정"]].map(([id, title]) => <div key={id} className="quick-card card" onClick={() => onNav(id)}><h3>{title}</h3><p>바로 이동하기</p></div>)}</div><h2>추천 여행지</h2><div className="grid dest-grid">{destinations.slice(0, 3).map((d, i) => <DestCard key={i} dest={d} />)}</div>{trips.length > 0 && <><h2 style={{ marginTop: 24 }}>최근 일정</h2>{trips.slice(0, 2).map(t => <TripCard key={t.trip_id} trip={t} />)}</>}</div>;
}

function ExplorePage({ token }) {
  const [province, setProvince] = useState("제주특별자치도");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [spots, setSpots] = useState([]);
  const [sourceLabel, setSourceLabel] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const dbData = await loadDestinationDetails(token);
      const provinceData = dbData.filter(d => !province || (d.province || "") === province);
      const areaCode = AREA_CODES[province] || "39";
      const apiArea = await fetchTourSpots({ areaCode, numOfRows: 12 });
      const apiKeyword = search.trim() ? await fetchTourKeyword(search.trim(), 12) : [];
      const apiData = dedupeSpots([...provinceData, ...apiArea, ...apiKeyword]);
      if (!alive) return;
      const next = apiData.map(s => ({ destination_name: s.destination_name || s.title || s.name, province: s.province || (s.addr1 ? s.addr1.split(" ")[0] : province), city: s.city || "", description: s.description || s.overview || "", image_url: s.image_url || s.firstimage || "" }));
      setSourceLabel(apiData.length ? "Tour API + Supabase" : "빈 결과");
      setSpots(next);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [province, token, search]);

  const filtered = useMemo(() => spots.filter(s => !search || `${s.destination_name} ${s.city} ${s.description}`.includes(search)), [spots, search]);

  return <div><div className="topnav"><strong>여행지 검색</strong></div><div className="section"><div className="input-row"><input className="form-input" placeholder="여행지 검색" value={search} onChange={e => setSearch(e.target.value)} /><select className="form-input" value={province} onChange={e => setProvince(e.target.value)}>{PROVINCES.map(p => <option key={p}>{p}</option>)}</select></div><div style={{ margin: "8px 0 16px", fontSize: 12, color: "#6b7f73" }}>데이터 출처: {sourceLabel || "불러오는 중"}</div>{loading ? <div className="loading"><div className="spinner" /></div> : filtered.length === 0 ? <div className="empty"><h3>검색 결과가 없습니다</h3><p>Tour API와 Supabase에서 불러온 결과가 없습니다.</p></div> : <div className="grid dest-grid">{filtered.map((d, i) => <DestCard key={i} dest={d} />)}</div>}</div></div>;
}

function PreferencePage({ token, userId, onDone }) {
  const questions = [{ id: "travel_tempo", title: "여행 스타일", options: [["active", "활동적"], ["relaxed", "여유롭게"]] }, { id: "food_preference", title: "맛집 스타일", options: [["popular", "유명 맛집"], ["local", "현지 맛집"]] }];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);
  const q = questions[step];
  const done = step === questions.length;
  const save = async () => { setSaving(true); const badge = calcBadge(answers.travel_tempo, answers.food_preference); await sb.upsert("user_preferences", { user_id: userId, travel_tempo: answers.travel_tempo, food_preference: answers.food_preference, badge }, token); setSaving(false); setStep(questions.length); };
  if (done) return <div className="section"><div className="panel"><h2>선호도 저장 완료</h2><p>이제 추천과 일정 생성에 반영됩니다.</p><button className="btn btn-primary" onClick={onDone}>메인으로</button></div></div>;
  return <div className="section"><div className="panel"><h2>{q.title}</h2><div className="chip-row">{q.options.map(([v, label]) => <button key={v} className={`chip${answers[q.id] === v ? " selected" : ""}`} onClick={() => setAnswers(a => ({ ...a, [q.id]: v }))}>{label}</button>)}</div><div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}><button className="btn btn-ghost" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>이전</button><button className="btn btn-primary" onClick={step === questions.length - 1 ? save : () => setStep(s => s + 1)} disabled={!answers[q.id] || saving}>{saving ? "저장 중..." : "다음"}</button></div></div></div>;
}

function TravelInputPage({ token, userId, userPref, onPlanResult }) {
  const [form, setForm] = useState({ province: "제주특별자치도", city: "", startDate: "", endDate: "", companionType: "", budget: "" });
  const [keywords, setKeywords] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("input");
  const [recs, setRecs] = useState([]);
  const [selectedRec, setSelectedRec] = useState(null);
  const [plan, setPlan] = useState(null);

  const toggleKw = kw => setKeywords(prev => prev.includes(kw) ? prev.filter(x => x !== kw) : prev.length >= 3 ? prev : [...prev, kw]);
  const validate = () => {
    const e = {};
    if (!form.startDate) e.startDate = "시작일을 선택하세요";
    if (!form.endDate) e.endDate = "종료일을 선택하세요";
    if (form.startDate && form.endDate && form.endDate < form.startDate) e.endDate = "종료일이 더 늦어야 합니다";
    if (!form.companionType) e.companionType = "동반자 유형을 선택하세요";
    if (keywords.length === 0) e.keywords = "키워드를 1개 이상 선택하세요";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const fetchCandidates = async () => {
    const areaCode = AREA_CODES[form.province] || "39";
    const cityKeyword = form.city?.trim();
    const keywordSeed = keywords[0] || cityKeyword || form.province;
    const [areaItems, keywordItems] = await Promise.all([fetchTourSpots({ areaCode, numOfRows: 20 }), keywordSeed ? fetchTourKeyword(keywordSeed, 20) : Promise.resolve([])]);
    return dedupeSpots([...areaItems, ...keywordItems]);
  };

  const handleRecommend = async () => {
    if (!validate()) return;
    setLoading(true);
    setStep("recommend");
    const candidates = await fetchCandidates();
    setRecs(rankSpots(candidates, [...keywords, form.province, form.city].filter(Boolean)));
    setSelectedRec(null);
    setLoading(false);
  };

  const handlePlan = async () => {
    if (!selectedRec) return;
    setLoading(true);
    setStep("plan");
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const daysCount = Math.max(1, Math.round((end - start) / 86400000) + 1);
    const days = buildItinerary(selectedRec, daysCount, userPref);
    try {
      const tripRes = await sb.upsert("trips", { user_id: userId, destination_id: null, title: `${form.province} 여행`, start_date: form.startDate, end_date: form.endDate, budget: form.budget ? parseInt(form.budget, 10) : null, companion_type: form.companionType, status: "계획" }, token);
      const tripId = Array.isArray(tripRes) ? tripRes[0]?.trip_id : tripRes?.trip_id;
      if (tripId) {
        for (const d of days) for (const [i, item] of d.items.entries()) await sb.upsert("itineraries", { trip_id: tripId, day_number: d.day, start_time: item.time, location_name: item.placeName, description: item.description, sort_order: i + 1 }, token);
      }
    } catch {}
    setPlan({ days, rec: selectedRec });
    setLoading(false);
  };

  if (step === "recommend") {
    return <div className="section"><div className="topnav"><strong>추천 결과</strong><button className="btn btn-ghost" onClick={() => setStep("input")}>조건 수정</button></div>{loading ? <div className="loading"><div className="spinner" /></div> : <><div className="grid" style={{ gap: 12 }}>{recs.map(r => <div key={r.destination_name} className="card" style={{ borderColor: selectedRec?.destination_name === r.destination_name ? "#1a5c3a" : "#dfe7e1", cursor: "pointer" }} onClick={() => setSelectedRec(r)}><strong>{r.destination_name}</strong><div style={{ fontSize: 13, color: "#4a6155", marginTop: 6 }}>{r.reason}</div>{r.description && <div style={{ fontSize: 13, color: "#6b7f73", marginTop: 6 }}>{r.description}</div>}</div>)}</div><div style={{ marginTop: 16, textAlign: "right" }}><button className="btn btn-primary" onClick={handlePlan} disabled={!selectedRec}>일정 생성</button></div></> }</div>;
  }
  if (step === "plan" && plan) {
    return <div className="section"><div className="topnav"><strong>생성된 여행 일정</strong><button className="btn btn-primary" onClick={() => onPlanResult?.("trips")}>일정으로 보기</button></div><div className="card" style={{ marginBottom: 16 }}>{selectedRec?.image_url ? <img className="dest-img" src={selectedRec.image_url} alt={selectedRec.destination_name} /> : null}<h3 style={{ marginTop: 12 }}>{selectedRec?.destination_name}</h3><p>{selectedRec?.description}</p></div>{plan.days.map(d => <div key={d.day} className="card" style={{ marginBottom: 12 }}><strong>Day {d.day}</strong>{d.items.map((item, i) => <div key={i} style={{ display: "flex", gap: 12, marginTop: 8 }}><div style={{ width: 70 }}>{item.time}</div><div><strong>{item.placeName}</strong><div style={{ fontSize: 13, color: "#4a6155" }}>{item.description}</div></div></div>)}</div>)}</div>;
  }
  return <div className="section"><div className="topnav"><strong>여행 정보 입력</strong></div><div className="panel"><div className="input-row"><div className="form-group"><label className="form-label">여행 지역</label><select className="form-input" value={form.province} onChange={e => setForm(f => ({ ...f, province: e.target.value }))}>{PROVINCES.map(p => <option key={p}>{p}</option>)}</select></div><div className="form-group"><label className="form-label">세부 지역</label><input className="form-input" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="예: 서귀포시" /></div></div><div className="input-row"><div className="form-group"><label className="form-label">시작일</label><input type="date" className="form-input" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />{errors.startDate && <div style={{ color: "#c0392b", fontSize: 12 }}>{errors.startDate}</div>}</div><div className="form-group"><label className="form-label">종료일</label><input type="date" className="form-input" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />{errors.endDate && <div style={{ color: "#c0392b", fontSize: 12 }}>{errors.endDate}</div>}</div></div><div className="input-row"><div className="form-group"><label className="form-label">동반자</label><select className="form-input" value={form.companionType} onChange={e => setForm(f => ({ ...f, companionType: e.target.value }))}><option value="">선택</option>{COMPANION_TYPES.map(c => <option key={c}>{c}</option>)}</select>{errors.companionType && <div style={{ color: "#c0392b", fontSize: 12 }}>{errors.companionType}</div>}</div><div className="form-group"><label className="form-label">예산</label><input type="number" className="form-input" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} /></div></div><div className="form-group"><label className="form-label">키워드</label><div className="chip-row">{KEYWORDS.map(kw => <button key={kw} className={`chip${keywords.includes(kw) ? " selected" : ""}`} onClick={() => toggleKw(kw)}>{kw}</button>)}</div>{errors.keywords && <div style={{ color: "#c0392b", fontSize: 12, marginTop: 6 }}>{errors.keywords}</div>}</div><button className="btn btn-primary" style={{ width: "100%" }} onClick={handleRecommend} disabled={loading}>{loading ? "분석 중..." : "여행지 추천받기"}</button></div></div>;
}

function TripsPage({ trips, loading, onDeleteTrip, onRefresh }) {
  if (loading) return <div className="loading"><div className="spinner" /></div>;
  return <div><div className="topnav"><strong>내 일정</strong><button className="btn btn-ghost" onClick={onRefresh}>새로고침</button></div><div className="section">{trips.length === 0 ? <div className="empty"><h3>저장된 일정이 없습니다</h3><p>여행 계획에서 일정을 생성해보세요.</p></div> : trips.map(t => <div key={t.trip_id} style={{ marginBottom: 12 }}><TripCard trip={t} /><button className="btn btn-secondary" onClick={() => onDeleteTrip(t.trip_id)}>삭제</button></div>)}</div></div>;
}

function CommunityPage() {
  const [posts, setPosts] = useState(() => { try { return JSON.parse(localStorage.getItem("tripai_posts") || "null") || DEFAULT_POSTS; } catch { return DEFAULT_POSTS; } });
  const [liked, setLiked] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  useEffect(() => { localStorage.setItem("tripai_posts", JSON.stringify(posts)); }, [posts]);
  const addPost = () => { if (!title.trim() || !body.trim()) return; setPosts(p => [{ id: Date.now(), author: "나", time: "방금 전", title: title.trim(), excerpt: body.trim(), tags: tags.split(",").map(x => x.trim()).filter(Boolean), likes: 0, comments: 0, emoji: "🧳" }, ...p]); setTitle(""); setBody(""); setTags(""); };
  return <div><div className="topnav"><strong>커뮤니티</strong></div><div className="section" style={{ maxWidth: 760 }}><div className="panel" style={{ marginBottom: 16 }}><h3>새 글 작성</h3><input className="form-input" placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} style={{ marginBottom: 8 }} /><textarea className="form-input" rows="4" placeholder="내용" value={body} onChange={e => setBody(e.target.value)} style={{ marginBottom: 8 }} /><input className="form-input" placeholder="태그를 쉼표로 구분" value={tags} onChange={e => setTags(e.target.value)} style={{ marginBottom: 8 }} /><button className="btn btn-primary" onClick={addPost}>게시하기</button></div>{posts.map(post => <div key={post.id} className="feed-card"><div className="feed-hero">{post.emoji}</div><div style={{ marginTop: 12 }}><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div className="avatar">{post.author[0]}</div><div><strong>{post.author}</strong><div style={{ fontSize: 12, color: "#4a6155" }}>{post.time}</div></div></div><h3>{post.title}</h3><p>{post.excerpt}</p><div className="chip-row">{post.tags.map(t => <span key={t} className="badge">{t}</span>)}</div><div className="feed-actions" style={{ marginTop: 12 }}><button className="btn btn-secondary" onClick={() => setLiked(l => ({ ...l, [post.id]: !l[post.id] }))}>{liked[post.id] ? "좋아요 취소" : "좋아요"} {post.likes + (liked[post.id] ? 1 : 0)}</button><button className="btn btn-secondary">댓글 {post.comments}</button><button className="btn btn-ghost" onClick={() => setPosts(p => p.filter(x => x.id !== post.id))}>삭제</button></div></div></div>)}</div></div>;
}

function MyPage({ user, badge, trips, onNav, onEditPref }) {
  const nick = user?.user_metadata?.nickname || user?.email?.split("@")[0] || "여행자";
  return <div><div className="topnav"><strong>마이페이지</strong><button className="btn btn-ghost" onClick={onEditPref}>선호도 수정</button></div><div className="section"><div className="panel"><h2>{nick}</h2><div>{user?.email}</div>{badge && <div style={{ marginTop: 8 }}><span className="badge">{badge}</span></div>}<div style={{ marginTop: 12 }}><button className="btn btn-primary" onClick={() => onNav("plan")}>여행 만들기</button></div></div><h3 style={{ marginTop: 24 }}>최근 여행</h3>{trips.length === 0 ? <div className="empty"><p>아직 여행이 없습니다.</p></div> : trips.slice(0, 3).map(t => <TripCard key={t.trip_id} trip={t} />)}</div></div>;
}

function LoginPage({ onLogin, onGotoSignup }) { const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false); const handle = async () => { if (!email || !pw) return setErr("이메일과 비밀번호를 입력하세요."); setLoading(true); const r = await sb.signIn(email, pw); if (r?.access_token) onLogin(r.access_token, r.user); else setErr(r?.error_description || r?.msg || "로그인 실패"); setLoading(false); }; return <div className="section"><div className="panel" style={{ maxWidth: 480, margin: "40px auto" }}><h2>로그인</h2>{err && <div className="alert">{err}</div>}<div className="form-group"><label className="form-label">이메일</label><input className="form-input" value={email} onChange={e => setEmail(e.target.value)} /></div><div className="form-group"><label className="form-label">비밀번호</label><input className="form-input" type="password" value={pw} onChange={e => setPw(e.target.value)} /></div><button className="btn btn-primary" onClick={handle} disabled={loading}>{loading ? "로그인 중..." : "로그인"}</button><button className="btn btn-ghost" style={{ marginLeft: 8 }} onClick={onGotoSignup}>회원가입</button></div></div>; }

function SignupPage({ onSignup, onGotoLogin }) { const [nickname, setNickname] = useState(""); const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [agree, setAgree] = useState(false); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false); const handle = async () => { if (!nickname || !email || !pw) return setErr("모든 항목을 입력하세요."); if (!agree) return setErr("이용약관에 동의해주세요."); setLoading(true); const r = await sb.signUp(email, pw, nickname); if (r?.id || r?.user?.id) { const lr = await sb.signIn(email, pw); if (lr?.access_token) onSignup(lr.access_token, lr.user); else setErr("가입은 되었지만 자동 로그인이 실패했습니다."); } else setErr(r?.message || "회원가입 실패"); setLoading(false); }; return <div className="section"><div className="panel" style={{ maxWidth: 480, margin: "40px auto" }}><h2>회원가입</h2>{err && <div className="alert">{err}</div>}<div className="form-group"><label className="form-label">닉네임</label><input className="form-input" value={nickname} onChange={e => setNickname(e.target.value)} /></div><div className="form-group"><label className="form-label">이메일</label><input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} /></div><div className="form-group"><label className="form-label">비밀번호</label><input className="form-input" type="password" value={pw} onChange={e => setPw(e.target.value)} /></div><label style={{ fontSize: 14 }}><input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} /> 이용약관에 동의합니다</label><div style={{ marginTop: 12 }}><button className="btn btn-primary" onClick={handle} disabled={loading}>{loading ? "가입 중..." : "회원가입"}</button><button className="btn btn-ghost" style={{ marginLeft: 8 }} onClick={onGotoLogin}>로그인</button></div></div></div>; }

export default function App() {
  const [authPage, setAuthPage] = useState("login");
  const [token, setToken] = useState(() => sessionStorage.getItem("tk") || "");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [badge, setBadge] = useState("");
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [userPref, setUserPref] = useState(null);
  const [showPref, setShowPref] = useState(false);

  const refreshTrips = async (u = user, tk = token) => { if (!u?.id) return; setTripsLoading(true); const data = await sb.select("trips", `user_id=eq.${u.id}&order=created_at.desc`, tk); setTrips(Array.isArray(data) ? data : []); setTripsLoading(false); };
  const refreshPref = async (u = user, tk = token) => { if (!u?.id) return; const data = await sb.select("user_preferences", `user_id=eq.${u.id}`, tk); if (Array.isArray(data) && data[0]) { setUserPref(data[0]); setBadge(data[0].badge || ""); setShowPref(false); } else { setShowPref(true); } };
  const refreshDestinations = async () => { const data = await loadDestinationDetails(token); setDestinations(data); };

  useEffect(() => { if (!token) return; sb.getUser(token).then(u => { if (u?.id) setUser(u); else { setToken(""); sessionStorage.removeItem("tk"); } }); }, [token]);
  useEffect(() => { if (!user?.id) return; refreshTrips(); refreshPref(); refreshDestinations(); }, [user]);

  const handleLogin = (tk, u) => { setToken(tk); sessionStorage.setItem("tk", tk); setUser(u); };
  const handleLogout = async () => { await sb.signOut(token); setToken(""); setUser(null); sessionStorage.removeItem("tk"); setTrips([]); setUserPref(null); setBadge(""); setPage("home"); };
  const handleDeleteTrip = async tripId => { await sb.del("trips", `trip_id=eq.${tripId}`, token); refreshTrips(); };
  const onPlanResult = async nextPage => { await refreshTrips(); setPage(nextPage); };

  if (!token || !user) return <><style>{css}</style>{authPage === "login" ? <LoginPage onLogin={handleLogin} onGotoSignup={() => setAuthPage("signup")} /> : <SignupPage onSignup={handleLogin} onGotoLogin={() => setAuthPage("login")} />}</>;
  if (showPref) return <><style>{css}</style><div className="topnav"><strong>여행 취향 설문</strong><button className="btn btn-ghost" onClick={() => setShowPref(false)}>닫기</button></div><PreferencePage token={token} userId={user.id} onDone={() => { refreshPref(); setPage("home"); }} /></>;

  return <><style>{css}</style><div className="app"><Sidebar page={page} onNav={p => { setPage(p); setShowPref(false); }} user={user} badge={badge} onLogout={handleLogout} /><main className="main">{page === "home" && <HomePage onNav={p => { setPage(p); setShowPref(false); }} user={user} badge={badge} trips={trips} destinations={destinations} />}{page === "explore" && <ExplorePage token={token} />}{page === "plan" && <TravelInputPage token={token} userId={user.id} userPref={userPref} onPlanResult={onPlanResult} />}{page === "trips" && <TripsPage trips={trips} loading={tripsLoading} onDeleteTrip={handleDeleteTrip} onRefresh={refreshTrips} />}{page === "community" && <CommunityPage />}{page === "mypage" && <MyPage user={user} badge={badge} trips={trips} onNav={p => setPage(p)} onEditPref={() => setShowPref(true)} />}</main></div></>;
}
