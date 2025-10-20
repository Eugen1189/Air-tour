import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTranslatedBlogPost } from '../hooks/useTranslatedContent';
import './ArticleCard.scss';

const ArticleCard = ({ article }) => {
  const { t, i18n } = useTranslation();
  
  // Get translated blog post content
  const translatedPost = useTranslatedBlogPost(article.id);
  
  // Use translated content if available, otherwise fallback to original
  const displayTitle = translatedPost?.title || article.title;
  const displayExcerpt = translatedPost?.excerpt || article.excerpt;
  const displayCategory = translatedPost?.category || article.category;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = i18n.language === 'es' ? 'es-ES' : 
                   i18n.language === 'de' ? 'de-DE' : 
                   i18n.language === 'it' ? 'it-IT' : 'en-US';
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <article className="article-card">
      {/* Image */}
      <div className="article-card__image">
        <img
          src={article.coverImage}
          alt={displayTitle}
        />
        <div className="article-card__category">
          {displayCategory}
        </div>
      </div>

      {/* Content */}
      <div className="article-card__content">
        <div className="article-card__meta">
          <span>📅 {formatDate(article.publishDate)}</span>
          <span>⏱️ {article.readTime}</span>
        </div>

        <h3 className="article-card__title">
          <Link to={`/blog/${article.slug}`}>
            {displayTitle}
          </Link>
        </h3>

        <p className="article-card__excerpt">
          {displayExcerpt}
        </p>

        <Link
          to={`/blog/${article.slug}`}
          className="article-card__link"
        >
          {t('Blog.readMore')} →
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;

