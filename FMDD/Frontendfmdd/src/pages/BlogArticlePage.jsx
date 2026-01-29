import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Calendar,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Loader2,
} from "lucide-react";
import api from "../axios";
import { useLanguage } from "../contexts/LanguageContext";

export default function BlogArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const lang = ["FR", "EN", "AR"].includes(language) ? language : "FR";

  const t = {
    FR: {
      back: "Retour aux actualités",
      notFound: "Article non trouvé",
      share: "Partager cet article :",
      related: "Articles similaires",
      unknownAuthor: "Auteur inconnu",
      unknownDate: "Date inconnue",
      copySuccess: "Lien copié",
      copyFail: "Impossible de copier",
    },
    EN: {
      back: "Back to news",
      notFound: "Article not found",
      share: "Share this article:",
      related: "Related articles",
      unknownAuthor: "Unknown author",
      unknownDate: "Unknown date",
      copySuccess: "Link copied",
      copyFail: "Copy failed",
    },
    AR: {
      back: "العودة إلى الأخبار",
      notFound: "المقال غير موجود",
      share: "مشاركة المقال:",
      related: "مقالات مشابهة",
      unknownAuthor: "كاتب غير معروف",
      unknownDate: "تاريخ غير معروف",
      copySuccess: "تم نسخ الرابط",
      copyFail: "فشل النسخ",
    },
  };

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/blog/${slug}`);
        const data = res.data.article || res.data.data;
        if (!data) throw new Error();

        setArticle({
          ...data,
          auteur: data.user?.name || data.auteur,
          contenu: data.contenu || data.content || "",
        });

        const rel = await api.get("/blog/populaires");
        setRelatedArticles((rel.data.articles?.data || []).slice(0, 3));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug, navigate]);

  const formatDate = (d) => {
    if (!d) return t[lang].unknownDate;
    return new Date(d).toLocaleDateString(lang === "FR" ? "fr-FR" : "en-US");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(t[lang].copySuccess);
    } catch {
      toast.error(t[lang].copyFail);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );

  if (error || !article)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">{t[lang].notFound}</h2>
        <Link to="/actualites" className="mt-4 text-blue-600">
          {t[lang].back}
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50" dir={lang === "AR" ? "rtl" : "ltr"}>
      <Helmet>
        <title>{article.titre} - FMDD</title>
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <Link to="/actualites" className="flex items-center text-blue-600 mb-6">
          <ArrowLeft size={18} className="mr-2" /> {t[lang].back}
        </Link>

        <article className="bg-white rounded-lg shadow p-8">
          <h1 className="text-4xl font-bold mb-4">{article.titre}</h1>

          <div className="flex gap-4 text-gray-600 mb-6">
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {article.auteur || t[lang].unknownAuthor}
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(article.date_publication)}
            </span>
          </div>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.contenu }}
          />

          <div className="mt-8 border-t pt-6">
            <h3 className="mb-4 font-medium">{t[lang].share}</h3>
            <div className="flex gap-4">
              <button onClick={copyToClipboard}>
                <Copy />
              </button>
            </div>
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">{t[lang].related}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((r) => (
                <Link key={r.id} to={`/actualites/${r.slug}`}>
                  <div className="border p-4 rounded">
                    <h4 className="font-semibold">{r.titre}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
