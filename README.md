# XyPriss Template Configuration (XFPM)

L'orchestration des templates XyPriss repose sur deux mécanismes complémentaires : le patching JSON pour les fichiers de configuration structurés et l'injection de code via des fichiers de règles dédiés pour les fichiers source.

## 1. Patching JSON (`xfpm.rules.json`)

Le fichier `xfpm.rules.json` est utilisé pour modifier dynamiquement les fichiers JSON/JSONC (comme `package.json` ou `xypriss.config.jsonc`).

### Actions Supportées

- **`&merge`** : Fusion récursive d'objets (idéal pour ajouter des scripts ou des dépendances).
- **`&rm`** : Suppression de clés ou de chemins d'objets.
- **`&rp-k` / `&rp-v`** : Remplacement de clés ou de valeurs.
- **`&array`** : Manipulation d'arrays (`&push`, `&filter`, etc.).

---

## 2. Injection de Code (`.xrules`)

Pour les fichiers source (`.ts`, `.js`) ou les fichiers texte complexes, nous utilisons des fichiers de règles avec l'extension **`.xrules`**. Cette approche évite d'inclure de la logique conditionnelle complexe dans le code source du template et permet d'injecter du code "propre" et multiligne.

### Syntaxe `.xrules`

Un fichier `.xrules` définit un fichier cible et un ou plusieurs blocs d'injection basés sur des marqueurs (commentaires) dans le code source.

```text
TARGET: chemin/vers/fichier.ts

@INJECT: // -->{{HOOK_NAME}}
  // Le code à injecter ici
  const example = true;
@END
```

### Fonctionnement du moteur XFPM

1. Le moteur identifie le fichier `TARGET`.
2. Il recherche la ligne correspondant exactement à la valeur après `@INJECT:`.
3. Il remplace cette ligne par le bloc de code contenu entre `@INJECT` et `@END`.

### Pourquoi `.xrules` ?

- **Code Source Propre** : Pas de ternaires ou de `if (mode === 'xms')` dans le projet final.
- **Lisibilité** : Contrairement au JSON, le code injecté conserve son indentation et sa lisibilité naturelle.
- **Modularité** : Chaque fonctionnalité (ex: `--security api`) peut avoir son propre fichier de règles d'injection.

---

## 3. Patching Texte Simple (`&patch` - Déprécié pour le code)

L'action `&patch` dans `xfpm.rules.json` reste disponible pour des remplacements de chaînes simples dans les fichiers non-JSON (ex: `README.md`), mais son utilisation est déconseillée pour l'injection de code multiligne au profit des fichiers `.xrules`.

### Exemple `&patch`
```json
"README.md": {
    "&patch": {
        "{{ORCHESTRATION_DESC}}": " and XMS (Multi-Server Orchestration)"
    }
}
```
