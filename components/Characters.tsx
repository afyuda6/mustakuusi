"use client";

import {ChangeEvent, startTransition, useDeferredValue, useState} from "react";
import {usePathname} from "next/navigation";
import {CharacterCard} from "./CharacterCard";
import {useInfiniteCarousel} from "@/hooks/useInfiniteCarousel";
import styles from "@/styles/Characters.module.css";

interface CharacterProps {
    id: string;
    name: string;
    imageSrc: string;
    description: {
        id: string;
        en: string;
    };
    role?: {
        en: string;
        id: string;
    };
}

interface CharactersSectionProps {
    characters: CharacterProps[];
    characterSearch: string;
}

export const Characters = ({characters, characterSearch}: CharactersSectionProps) => {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en");

    const [searchKeyword, setSearchKeyword] = useState("");
    const deferredKeyword = useDeferredValue(searchKeyword);
    const normalizedKeyword = deferredKeyword.trim().toLowerCase();

    const filteredCharacters = characters.filter((c) =>
        c.name.toLowerCase().includes(normalizedKeyword)
    );

    const {
        trackRef,
        renderItems,
        activeRenderIndex,
        activeIndex,
        isSingle,
        goTo,
        next,
        prev,
        pause,
        resume,
    } = useInfiniteCarousel({
        items: filteredCharacters,
        getId: (c) => c.id,
        slideClassName: styles.carouselSlide,
        resetKey: normalizedKeyword,
    });

    const total = filteredCharacters.length;

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setSearchKeyword(event.target.value);
        });
    };

    return (
        <section className={styles.container} id="characters">
            <div className={styles.searchRow}>
                <label className={styles.searchLabel} htmlFor="characters-search">
                    {characterSearch}
                </label>
                <input
                    id="characters-search"
                    type="search"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    placeholder={isEnglish ? "Type a name..." : "Ketik nama..."}
                    className={styles.searchInput}
                />
            </div>

            {total > 0 ? (
                <div
                    className={styles.carouselWrapper}
                    onMouseEnter={pause}
                    onMouseLeave={resume}
                    onPointerDown={pause}
                    onPointerUp={resume}
                    onFocusCapture={pause}
                    onBlurCapture={resume}
                >
                    <button
                        className={`${styles.navBtn} ${styles.btnPrev}`}
                        onClick={prev}
                        disabled={isSingle}
                    >
                        &#8249;
                    </button>

                    <div className={styles.carouselViewport}>
                        <div
                            className={`${styles.carouselTrack} ${isSingle ? styles.carouselTrackSingle : ""}`}
                            ref={trackRef}
                        >
                            {!isSingle && (
                                <div className={styles.carouselSpacerSlide} data-spacer="true" aria-hidden="true">
                                    <div>
                                        <span></span>
                                    </div>
                                </div>
                            )}

                            {renderItems.map(({item, key, renderIndex}) => (
                                <div
                                    key={key}
                                    className={`${styles.carouselSlide} ${
                                        renderIndex === activeRenderIndex ? styles.slideActive : ""
                                    }`}
                                >
                                    <CharacterCard character={item}/>
                                </div>
                            ))}

                            {!isSingle && (
                                <div className={styles.carouselSpacerSlide} data-spacer="true" aria-hidden="true">
                                    <div>
                                        <span></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        className={`${styles.navBtn} ${styles.btnNext}`}
                        onClick={next}
                        disabled={isSingle}
                    >
                        &#8250;
                    </button>

                    {!isSingle && (
                        <div className={styles.dots}>
                            {filteredCharacters.map((_, i) => (
                                <button
                                    key={i}
                                    className={`${styles.dot} ${
                                        i === activeIndex ? styles.dotActive : ""
                                    }`}
                                    onClick={() => goTo(i)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <p className={styles.emptyState}>
                    {isEnglish
                        ? `No characters match the keyword "${searchKeyword.trim()}".`
                        : `Tidak ada karakter yang cocok dengan kata kunci "${searchKeyword.trim()}".`}
                </p>
            )}
        </section>
    );
};