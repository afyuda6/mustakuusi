// @ts-nocheck


export const routes = {
  "meta": {},
  "id": "_default",
  "name": "",
  "file": {
    "path": "src/routes",
    "dir": "src",
    "base": "routes",
    "ext": "",
    "name": "routes"
  },
  "rootName": "default",
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {},
      "id": "_default_svelte",
      "name": "svelte",
      "module": false,
      "file": {
        "path": "src/routes/svelte",
        "dir": "src/routes",
        "base": "svelte",
        "ext": "",
        "name": "svelte"
      },
      "children": [
        {
          "meta": {
            "dynamic": true,
            "order": false,
            "dynamicSpread": true
          },
          "id": "_default_svelte_____catchall__svelte",
          "name": "[...catchall]",
          "file": {
            "path": "src/routes/svelte/[...catchall].svelte",
            "dir": "src/routes/svelte",
            "base": "[...catchall].svelte",
            "ext": ".svelte",
            "name": "[...catchall]"
          },
          "asyncModule": () => import('../src/routes/svelte/[...catchall].svelte'),
          "children": []
        },
        {
          "meta": {
            "dynamic": true,
            "order": false
          },
          "id": "_default_svelte__id__svelte",
          "name": "[id]",
          "file": {
            "path": "src/routes/svelte/[id].svelte",
            "dir": "src/routes/svelte",
            "base": "[id].svelte",
            "ext": ".svelte",
            "name": "[id]"
          },
          "asyncModule": () => import('../src/routes/svelte/[id].svelte'),
          "children": []
        },
        {
          "meta": {},
          "id": "_default_svelte_character",
          "name": "character",
          "module": false,
          "file": {
            "path": "src/routes/svelte/character",
            "dir": "src/routes/svelte",
            "base": "character",
            "ext": "",
            "name": "character"
          },
          "children": [
            {
              "meta": {
                "dynamic": true,
                "order": false
              },
              "id": "_default_svelte_character__id__svelte",
              "name": "[id]",
              "file": {
                "path": "src/routes/svelte/character/[id].svelte",
                "dir": "src/routes/svelte/character",
                "base": "[id].svelte",
                "ext": ".svelte",
                "name": "[id]"
              },
              "asyncModule": () => import('../src/routes/svelte/character/[id].svelte'),
              "children": []
            }
          ]
        },
        {
          "meta": {
            "isDefault": true
          },
          "id": "_default_svelte_index_svelte",
          "name": "index",
          "file": {
            "path": "src/routes/svelte/index.svelte",
            "dir": "src/routes/svelte",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "asyncModule": () => import('../src/routes/svelte/index.svelte'),
          "children": []
        },
        {
          "meta": {},
          "id": "_default_svelte_privacy_policy",
          "name": "privacy-policy",
          "module": false,
          "file": {
            "path": "src/routes/svelte/privacy-policy",
            "dir": "src/routes/svelte",
            "base": "privacy-policy",
            "ext": "",
            "name": "privacy-policy"
          },
          "children": [
            {
              "meta": {
                "dynamic": true,
                "order": false
              },
              "id": "_default_svelte_privacy_policy__id__svelte",
              "name": "[id]",
              "file": {
                "path": "src/routes/svelte/privacy-policy/[id].svelte",
                "dir": "src/routes/svelte/privacy-policy",
                "base": "[id].svelte",
                "ext": ".svelte",
                "name": "[id]"
              },
              "asyncModule": () => import('../src/routes/svelte/privacy-policy/[id].svelte'),
              "children": []
            }
          ]
        }
      ]
    },
    {
      "meta": {
        "dynamic": true,
        "dynamicSpread": true,
        "order": false,
        "inline": false
      },
      "name": "[...404]",
      "file": {
        "path": ".routify/components/[...404].svelte",
        "dir": ".routify/components",
        "base": "[...404].svelte",
        "ext": ".svelte",
        "name": "[...404]"
      },
      "asyncModule": () => import('./components/[...404].svelte'),
      "children": []
    }
  ]
}
export default routes