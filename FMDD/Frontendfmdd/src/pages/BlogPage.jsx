import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "../components/commun/BlogCard";
import api from "../axios";
import { useLanguage } from "../contexts/LanguageContext";

export default function BlogPage() {
    const { language } = useLanguage();
    const lang = ["FR", "EN", "AR"].includes(language) ? language : "FR";

    const texts = {
        FR: {
            pageTitle: "Blog - FMDD",
            metaDesc: "Découvrez les dernières actualités, événements et initiatives du FMDD.",
            title: "Blog",
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
            loading: "Chargement...",
            error: "Erreur de chargement",
            errorDesc: "Impossible de charger les articles. Veuillez réessayer.",
            page: "Page",
            of: "sur",
        },
        EN: {
            pageTitle: "Blog - FMDD",
            metaDesc: "Discover the latest FMDD news, events and initiatives.",
            title: "Blog",
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
            loading: "Loading...",
            error: "Loading error",
            errorDesc: "Unable to load articles. Please try again.",
            page: "Page",
            of: "of",
        },
        AR: {
            pageTitle: "المدونة - FMDD",
            metaDesc: "اكتشف آخر أخبار وأنشطة FMDD.",
            title: "المدونة",
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
            loading: "جاري التحميل...",
            error: "خطأ في التحميل",
            errorDesc: "تعذر تحميل المقالات. يرجى المحاولة مرة أخرى.",
            page: "صفحة",
            of: "من",
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
        setError(null);
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
                author: article.user?.name || article.auteur || "FMDD",
                image: formatImageUrl(article.image_principale),
                tags: article.tags || [],
            }));

            setArticles(formattedArticles);
            setPagination(response.data.articles);
        } catch (err) {
            console.error("Error loading articles:", err);
            setError(texts[lang].error);
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
        if (page < 1 || page > pagination.last_page) return;
        const params = {};
        if (page > 1) params.page = page;
        if (searchQuery) params.search = searchQuery;
        setSearchParams(params);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleReset = () => {
        setSearchQuery("");
        setSearchParams({});
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-blue-light">
                <Loader2 className="animate-spin h-12 w-12 text-blue-600 mb-4" />
                <p className="text-gray-600">{texts[lang].loading}</p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{texts[lang].pageTitle}</title>
                <meta name="description" content={texts[lang].metaDesc} />
            </Helmet>

            <div className="py-12 bg-blue-light min-h-screen" dir={lang === "AR" ? "rtl" : "ltr"}>
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                            {texts[lang].title}
                        </h1>
                        <p className="mb-8 text-gray-700 max-w-3xl text-lg">
                            {texts[lang].intro}
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
                            <div className="relative flex-1">
                                <input
                                    name="search"
                                    placeholder={texts[lang].searchPlaceholder}
                                    defaultValue={searchQuery}
                                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                                <Search
                                    className={`absolute ${lang === "AR" ? "right-3" : "left-3"} top-3.5 text-gray-400`}
                                    size={20}
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                {texts[lang].searchBtn}
                            </button>
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                >
                                    {texts[lang].reset}
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                            <h3 className="text-xl font-semibold text-red-800 mb-2">
                                {texts[lang].error}
                            </h3>
                            <p className="text-red-600 mb-4">{texts[lang].errorDesc}</p>
                            <button
                                onClick={() => fetchArticles(pagination.current_page, searchQuery)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                {texts[lang].retry}
                            </button>
                        </div>
                    )}

                    {/* Articles Grid */}
                    {!error && articles.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {articles.map((article) => (
                                    <BlogCard key={article.id} {...article} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.last_page > 1 && (
                                <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
                                    <button
                                        onClick={() => handlePageChange(pagination.current_page - 1)}
                                        disabled={pagination.current_page === 1}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${pagination.current_page === 1
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                : "bg-white text-blue-600 hover:bg-blue-50 shadow"
                                            }`}
                                    >
                                        <ChevronLeft size={20} />
                                        <span className="hidden sm:inline">
                                            {lang === "AR" ? "التالي" : lang === "EN" ? "Previous" : "Précédent"}
                                        </span>
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-700 font-medium">
                                            {texts[lang].page} {pagination.current_page} {texts[lang].of}{" "}
                                            {pagination.last_page}
                                        </span>
                                        <span className="text-gray-500">
                                            ({pagination.total}{" "}
                                            {pagination.total > 1
                                                ? texts[lang].articles
                                                : texts[lang].article})
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(pagination.current_page + 1)}
                                        disabled={pagination.current_page === pagination.last_page}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${pagination.current_page === pagination.last_page
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                : "bg-white text-blue-600 hover:bg-blue-50 shadow"
                                            }`}
                                    >
                                        <span className="hidden sm:inline">
                                            {lang === "AR" ? "السابق" : lang === "EN" ? "Next" : "Suivant"}
                                        </span>
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* No Results */}
                    {!error && articles.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-lg shadow">
                            <div className="max-w-md mx-auto">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                    {texts[lang].noArticle}
                                </h3>
                                <p className="text-gray-600 mb-6">{texts[lang].noArticleDesc}</p>
                                {searchQuery && (
                                    <button
                                        onClick={handleReset}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        {texts[lang].reset}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
