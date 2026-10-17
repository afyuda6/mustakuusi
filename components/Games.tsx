"use client";

import {ChangeEvent, startTransition, useCallback, useDeferredValue, useState} from "react";
import {usePathname} from "next/navigation";
import {GameCard} from "./GameCard";
import {useInfiniteCarousel} from "@/hooks/useInfiniteCarousel";
import styles from "@/styles/Games.module.css";
import categoryTree from "@/public/data/categories.json";

interface GameProps {
    id: string;
    title: {
        id: string;
        en: string;
    };
    imageSrc: string;
    date: string;
    description: {
        id: string;
        en: string;
    };
    categories: {
        id: string[];
        en: string[];
    };
    detail: string;
    downloadLink: string;
    characters?: {
        id: string;
        role: {
            en: string;
            id: string;
        };
    }[];
}

interface GamesSectionProps {
    games: GameProps[];
    allGames?: GameProps[];
    gameSearch: string;
    characterId?: string;
    isUpcoming?: boolean;
    sectionId?: string;
}

const getCategoryLabel = (value: string, isEnglish: boolean): string | null => {
    for (const parent of categoryTree) {
        if (parent.value === value) return isEnglish ? parent.label.en : parent.label.id;
        const child = parent.children.find(c => c.value === value);
        if (child) return isEnglish ? child.label.en : child.label.id;
    }
    return null;
};

export const Games = ({games, allGames, gameSearch, characterId, isUpcoming, sectionId}: GamesSectionProps) => {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en");

    const now = Date.now();

    const categorySource = (allGames ?? games).filter(game => {
        const releaseTime = new Date(game.date).getTime();
        return isUpcoming ? releaseTime > now : releaseTime <= now;
    });

    const availableCategoryTree = categoryTree
        .map(parent => ({
            ...parent,
            children: parent.children.filter(child => {
                const childLabel = getCategoryLabel(child.value, isEnglish);
                return categorySource.some(game => {
                    const cats = isEnglish ? game.categories.en : game.categories.id;
                    return cats.includes(childLabel ?? "");
                });
            })
        }))
        .filter(parent => {
            const parentLabel = getCategoryLabel(parent.value, isEnglish);
            return categorySource.some(game => {
                const cats = isEnglish ? game.categories.en : game.categories.id;
                return cats.includes(parentLabel ?? "");
            });
        });

    const [searchKeyword, setSearchKeyword] = useState("");
    const [activeParent, setActiveParent] = useState("all");
    const [activeChild, setActiveChild] = useState<string | null>(null);

    const deferredKeyword = useDeferredValue(searchKeyword);
    const normalizedKeyword = deferredKeyword.trim().toLowerCase();

    const isSearching = normalizedKeyword.length > 0;
    const isFilteringCategory = activeParent !== "all" || activeChild !== null;

    const filteredGames = games.filter((game) => {
        const releaseTime = new Date(game.date).getTime();
        const matchesRelease = isUpcoming ? releaseTime > now : releaseTime <= now;
        if (!matchesRelease) return false;

        const currentCategories = isEnglish
            ? game.categories.en
            : game.categories.id;

        const matchesCategory = (() => {
            if (activeParent === "all") return true;

            const parentLabel = getCategoryLabel(activeParent, isEnglish);
            if (!parentLabel) return true;
            if (!currentCategories.includes(parentLabel)) return false;
            if (!activeChild) return true;

            const childLabel = getCategoryLabel(activeChild, isEnglish);
            if (!childLabel) return true;
            return currentCategories.includes(childLabel);
        })();

        if (!normalizedKeyword) return matchesCategory;

        const combinedText = [
            isEnglish ? game.title.en : game.title.id,
            isEnglish ? game.description.en : game.description.id,
            ...currentCategories
        ]
            .join(" ")
            .toLowerCase();

        const keywords = normalizedKeyword.split(/\s+/);
        const matchesSearch = keywords.every((word) => combinedText.includes(word));

        return matchesCategory && matchesSearch;
    })
        .sort((a, b) => {
            const aTime = new Date(a.date).getTime();
            const bTime = new Date(b.date).getTime();
            return isUpcoming ? aTime - bTime : bTime - aTime;
        });

    const total = filteredGames.length;

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
        items: filteredGames,
        getId: (g) => g.id,
        slideClassName: styles.carouselSlide,
        resetKey: `${normalizedKeyword}|${activeParent}|${activeChild}`,
    });

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        startTransition(() => setSearchKeyword(event.target.value));
    };

    const handleParentChange = (value: string) => {
        startTransition(() => {
            setActiveParent((prev) => (prev === value ? "all" : value));
            setActiveChild(null);
        });
    };

    const handleChildChange = (value: string) => {
        startTransition(() => {
            setActiveChild((prev) => (prev === value ? null : value));
        });
    };

    const activeTree = availableCategoryTree.find((c) => c.value === activeParent);

    const handleCategoryClickFromCard = useCallback((categoryLabel: string) => {
        for (const parent of categoryTree) {
            const parentLabel = isEnglish ? parent.label.en : parent.label.id;
            if (parentLabel === categoryLabel) {
                startTransition(() => {
                    setActiveParent((prev) => prev === parent.value ? "all" : parent.value);
                    setActiveChild(null);
                });
                return;
            }
            const child = parent.children.find(c =>
                (isEnglish ? c.label.en : c.label.id) === categoryLabel
            );
            if (child) {
                startTransition(() => {
                    setActiveParent(parent.value);
                    setActiveChild((prev) => prev === child.value ? null : child.value);
                });
                return;
            }
        }
    }, [isEnglish]);

    const activeCategories = (() => {
        const result: string[] = [];
        if (activeParent !== "all") {
            const parentLabel = getCategoryLabel(activeParent, isEnglish);
            if (parentLabel) result.push(parentLabel);
        }
        if (activeChild) {
            const childLabel = getCategoryLabel(activeChild, isEnglish);
            if (childLabel) result.push(childLabel);
        }
        return result;
    })();

    return (
        <section className={`${styles.container} ${total === 0 ? styles.containerEmpty : ""}`}
                 id={sectionId ?? "games"}>
            <div className={styles.searchRow}>
                <label
                    className={styles.searchLabel}
                    htmlFor={!isUpcoming ? "games-search" : undefined}
                >
                    {gameSearch}
                </label>

                {!isUpcoming && (
                    <input
                        id="games-search"
                        type="search"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        placeholder={isEnglish ? "Type a title, category, or keyword..." : "Ketik judul, kategori, atau kata kunci..."}
                        className={styles.searchInput}
                    />
                )}
            </div>

            <div className={styles.categoryFilter}>
                {availableCategoryTree.map(({value, label}) => (
                    <button
                        key={value}
                        className={`${styles.categoryBtn} ${
                            activeParent === value ? styles.categoryBtnActive : ""
                        }`}
                        onClick={() => handleParentChange(value)}
                    >
                        {isEnglish ? label.en : label.id}
                    </button>
                ))}
            </div>

            {activeTree && activeTree.children.length > 0 && (
                <div className={styles.subCategoryFilter}>
                    {activeTree.children.map((child) => (
                        <button
                            key={child.value}
                            className={`${styles.categoryBtn} ${styles.categoryBtnSub} ${
                                activeChild === child.value ? styles.categoryBtnActive : ""
                            }`}
                            onClick={() => handleChildChange(child.value)}
                        >
                            {isEnglish ? child.label.en : child.label.id}
                        </button>
                    ))}
                </div>
            )}

            {(isSearching || isFilteringCategory) && (
                <p className={styles.gameCount}>
                    {isEnglish ? `Showing ${total} game${total !== 1 ? "s" : ""}` : `Menampilkan ${total} game`}
                </p>
            )}

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
                                    <GameCard
                                        game={item}
                                        searchKeyword={normalizedKeyword}
                                        characterId={characterId}
                                        onCategoryClick={handleCategoryClickFromCard}
                                        activeCategories={activeCategories}
                                    />
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
                            {filteredGames.map((_, i) => (
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
                    {isSearching
                        ? isEnglish
                            ? `No games match "${searchKeyword.trim()}".`
                            : `Tidak ada game yang cocok dengan "${searchKeyword.trim()}".`
                        : isFilteringCategory
                            ? isEnglish
                                ? "No games in this category."
                                : "Tidak ada game dalam kategori ini."
                            : isEnglish
                                ? "No games available."
                                : "Tidak ada game."}
                </p>
            )}
        </section>
    );
};