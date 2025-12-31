# PocketBase Setup for Ethik Platform

To run the application with full functionality, you need to set up a PocketBase instance.

## 1. Deploy PocketBase
Follow Coolify instructions to deploy a PocketBase service, or run locally:
```bash
./pocketbase serve
```

## 2. Create Collection
1. Log in to the PocketBase Admin UI (usually `/_/`).
2. Click **"New Collection"**.
3. Name: `themes`
4. **API Rules**:
   - For a private server, you can set all rules (List, View, Create, Update, Delete) to empty string (public) to allow the app to work without login.
   - For better security, you should implement authentication, but for this "simple" version, removing rules allows the app to function immediately.

5. **Fields**:
   Add the following fields:

   | Field Name | Type | Options |
   |Data|Type|Note|
   |---|---|---|
   | `name` | **JSON** | For bilingual titles |
   | `description` | **JSON** | For bilingual descriptions |
   | `icon` | **Text** | |
   | `color` | **Text** | |
   | `topics` | **JSON** | |
   | `methodology` | **JSON** | |
   | `cases` | **JSON** | |
   | `flashcardsPro` | **JSON** | |
   | `flashcardsSimple` | **JSON** | |
   | `flashcardsExam` | **JSON** | |
   | `vocabulary` | **JSON** | |

   *Note: Using JSON fields allows us to store the complex nested structures without creating 10+ related tables.*

## 3. Connect App
Set the environment variable in Coolify or `.env`:
```
VITE_POCKETBASE_URL=https://your-pocketbase-url.com
```
