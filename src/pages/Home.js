//Home or News Page

import React from 'react'
import NewsCards from '../components/NewsCards/NewsCards'

export default function Home({ newsArticles, activeNewsCard }) {
    return (
        <div>
            <NewsCards articles={newsArticles} activeNewsCard={activeNewsCard} />
        </div>
    )
}