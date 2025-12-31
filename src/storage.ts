
import type { Theme } from './types';
import { pb } from './lib/pocketbase';


const COLLECTION_NAME = 'themes';

export const getThemes = async (): Promise<Theme[]> => {
    try {
        const records = await pb.collection(COLLECTION_NAME).getFullList({
            sort: '-created',
        });

        // Map PB records to our Theme type
        // PocketBase returns the record with its internal id, created, updated fields.
        // We need to ensure we map them correctly.
        return records.map(record => ({
            id: record.id, // Use PB id
            name: record.name,
            description: record.description,
            icon: record.icon,
            color: record.color,
            topics: record.topics || [],
            methodology: record.methodology || [],
            cases: record.cases || [],
            flashcardsPro: record.flashcardsPro || [],
            flashcardsSimple: record.flashcardsSimple || [],
            flashcardsExam: record.flashcardsExam || [],
            vocabulary: record.vocabulary || [],
            createdAt: record.created,
            updatedAt: record.updated
        })) as Theme[];
    } catch (error) {
        console.error('Failed to fetch themes from PocketBase:', error);
        // Fallback or empty? 
        // For now, let's return empty array so UI logic can handle it or show error.
        // If PB is down, showing sample data might be confusing if user expects their data.
        return [];
    }
};

export const getThemeById = async (id: string): Promise<Theme | undefined> => {
    try {
        const record = await pb.collection(COLLECTION_NAME).getOne(id);
        return {
            id: record.id,
            name: record.name,
            description: record.description,
            icon: record.icon,
            color: record.color,
            topics: record.topics || [],
            methodology: record.methodology || [],
            cases: record.cases || [],
            flashcardsPro: record.flashcardsPro || [],
            flashcardsSimple: record.flashcardsSimple || [],
            flashcardsExam: record.flashcardsExam || [],
            vocabulary: record.vocabulary || [],
            createdAt: record.created,
            updatedAt: record.updated
        } as Theme;
    } catch (error) {
        console.error(`Failed to fetch theme ${id}:`, error);
        return undefined;
    }
};

export const saveTheme = async (theme: Theme): Promise<Theme | undefined> => {
    try {
        // Prepare data for PB
        const data = {
            name: theme.name,
            description: theme.description,
            icon: theme.icon,
            color: theme.color,
            topics: theme.topics,
            methodology: theme.methodology,
            cases: theme.cases,
            flashcardsPro: theme.flashcardsPro,
            flashcardsSimple: theme.flashcardsSimple,
            flashcardsExam: theme.flashcardsExam,
            vocabulary: theme.vocabulary
        };

        let record;
        // Check if theme exists (by checking if ID is a valid PB ID or if we are updating)
        // Note: theme.id might be a temp ID if created locally, so we should check length/format or just try to create.
        // However, if we come from "createEmptyTheme", we gave it a temp ID.
        // If it's a new theme, we create. If existing, we update.
        // PB IDs are 15 chars.

        // Simpler logic: if we can find it, update it. If not, create.
        // But `create` generates a new ID.

        let exists = false;
        if (theme.id && theme.id.length === 15) {
            try {
                await pb.collection(COLLECTION_NAME).getOne(theme.id);
                exists = true;
            } catch { }
        }

        if (exists) {
            record = await pb.collection(COLLECTION_NAME).update(theme.id, data);
        } else {
            record = await pb.collection(COLLECTION_NAME).create(data);
        }

        return {
            ...theme,
            id: record.id,
            createdAt: record.created,
            updatedAt: record.updated
        };
    } catch (error) {
        console.error('Failed to save theme:', error);
        return undefined;
    }
};

export const deleteTheme = async (id: string): Promise<void> => {
    try {
        await pb.collection(COLLECTION_NAME).delete(id);
    } catch (error) {
        console.error('Failed to delete theme:', error);
    }
};

export const createEmptyTheme = (tempId: string, name: { pt: string; de: string }): Theme => ({
    id: tempId, // specific temp ID
    name,
    description: { pt: '', de: '' },
    icon: 'Book',
    color: '#4a5568',
    topics: [],
    methodology: [],
    cases: [],
    flashcardsPro: [],
    flashcardsSimple: [],
    flashcardsExam: [],
    vocabulary: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
});
