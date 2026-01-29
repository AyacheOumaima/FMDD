import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "../components/commun/BlogCard";
import api from "../axios";
import { useLanguage } from "../contexts/LanguageContext";

export default function ActualitesPage() {
  const { language } = useLanguage();
  const lang = ["FR", "EN", "AR"].includes(language) ? language : "FR";

  const texts = {
    FR: {
      pageTitle: "Actualités - FMDD",
      metaDesc: "Découvrez les dernières actualités, événements et initiatives du FMDD.",
      title: "Actualités",
      intro:
        "Découvrez les dernières actualités, événements et initiatives du FMDD. Restez informé des avancées et des projets dans le domaine du développement durable au Maroc.",
      searchPlaceholder: "Rechercher des articles...",
      searchBtn: "Rechercher",
      sortBy: "Trier par",
      filters: "Filtres",
      reset: "Réinitialiser",
      retry: "Réessayer",
      noArticle: "Aucun article trouvé",
      noArticleDesc: "Aucun article ne correspond à vos critères de recherche.",
      total: "au total",
      articles: "articles",
      article: "article",
    },
    EN: {
      pageTitle: "News - FMDD",
      metaDesc: "Discover the latest FMDD news, events and initiatives.",
      title: "News",
      intro:
        "Discover the latest FMDD news, events and initiatives. Stay informed about sustainable development projects in Morocco.",
      searchPlaceholder: "Search articles...",
      searchBtn: "Search",
      sortBy: "Sort by",
      filters: "Filters",
      reset: "Reset",
      retry: "Retry",
      noArticle: "No articles found",
      noArticleDesc: "No articles match your search criteria.",
      total: "total",
      articles: "articles",
      article: "article",
    },
    AR: {
      pageTitle: "الأخبار - FMDD",
      metaDesc: "اكتشف آخر أخبار وأنشطة FMDD.",
      title: "الأخبار",
      intro:
        "اكتشف آخر أخبار وأنشطة FMDD وابق على اطلاع بمشاريع التنمية المستدامة في المغرب.",
      searchPlaceholder: "ابحث عن مقالات...",
      searchBtn: "بحث",
      sortBy: "ترتيب حسب",
      filters: "الفلاتر",
      reset: "إعادة التعيين",
      retry: "إعادة المحاولة",
      noArticle: "لم يتم العثور على مقالات",
      noArticleDesc: "لا توجد مقالات تطابق البحث.",
      total: "المجموع",
      articles: "مقالات",
      article: "مقال",
    },
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 9,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const formatImageUrl = (imagePath) => {
    if (!imagePath)
      return "https://placehold.co/800x450/ffffff/cccccc?text=Image";
    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = import.meta.env.VITE_API_BASE_URL
      ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/v1\/?$/, "")
      : "http://localhost:8000";

    const cleanPath = imagePath.startsWith("/storage")
      ? imagePath
      : `/storage/${imagePath.replace(/^\/+/, "")}`;

    return `${baseUrl}${cleanPath}`;
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    setSearchQuery(search);
    fetchArticles(page, search);
  }, [searchParams]);

  const fetchArticles = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (page > 1) params.set("page", page);
      if (search) params.set("search", search);
      params.set("per_page", 9);

      const response = await api.get(`/blog?${params.toString()}`);

      const formattedArticles = response.data.articles.data.map((article) => ({
        id: article.id,
        slug: article.slug,
        title: article.titre,
        excerpt: article.resume,
        date: article.date_publication,
        author: article.user?.name || "FMDD",
        image: formatImageUrl(article.image_principale),
        tags: article.tags || [],
      }));

      setArticles(formattedArticles);
      setPagination(response.data.articles);
      setError(null);
    } catch (err) {
      setError("Error loading articles");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearch = e.target.search.value;
    setSearchParams({ search: newSearch, page: 1 });
  };

  const handlePageChange = (page) => {
    setSearchParams({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-t-2 border-blue-600 rounded-full"></div>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{texts[lang].pageTitle}</title>
        <meta name="description" content={texts[lang].metaDesc} />
      </Helmet>

      <div className="py-12 bg-blue-light min-h-screen" dir={lang === "AR" ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{texts[lang].title}</h1>
          <p className="mb-8 text-gray-700 max-w-3xl">{texts[lang].intro}</p>

          <form onSubmit={handleSearch} className="flex gap-2 mb-10">
            <div className="relative flex-1">
              <input
                name="search"
                placeholder={texts[lang].searchPlaceholder}
                defaultValue={searchQuery}
                className="w-full px-4 py-2 pl-10 border rounded-md"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              {texts[lang].searchBtn}
            </button>
          </form>

          {articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <BlogCard key={article.id} {...article} />
                ))}
              </div>

              {pagination.last_page > 1 && (
                <div className="mt-12 flex justify-center items-center space-x-2">
                  <button onClick={() => handlePageChange(pagination.current_page - 1)}>
                    <ChevronLeft />
                  </button>

                  <span>
                    {pagination.total}{" "}
                    {pagination.total > 1
                      ? texts[lang].articles
                      : texts[lang].article}{" "}
                    {texts[lang].total}
                  </span>

                  <button onClick={() => handlePageChange(pagination.current_page + 1)}>
                    <ChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl mb-2">{texts[lang].noArticle}</h3>
              <p>{texts[lang].noArticleDesc}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
