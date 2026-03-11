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
      "id": "_default_y",
      "name": "y",
      "module": false,
      "file": {
        "path": "src/routes/y",
        "dir": "src/routes",
        "base": "y",
        "ext": "",
        "name": "y"
      },
      "children": [
        {
          "meta": {
            "dynamic": true,
            "order": false,
            "dynamicSpread": true
          },
          "id": "_default_y_____catchall__svelte",
          "name": "[...catchall]",
          "file": {
            "path": "src/routes/y/[...catchall].svelte",
            "dir": "src/routes/y",
            "base": "[...catchall].svelte",
            "ext": ".svelte",
            "name": "[...catchall]"
          },
          "asyncModule": () => import('../src/routes/y/[...catchall].svelte'),
          "children": []
        },
        {
          "meta": {
            "dynamic": true,
            "order": false
          },
          "id": "_default_y__id__svelte",
          "name": "[id]",
          "file": {
            "path": "src/routes/y/[id].svelte",
            "dir": "src/routes/y",
            "base": "[id].svelte",
            "ext": ".svelte",
            "name": "[id]"
          },
          "asyncModule": () => import('../src/routes/y/[id].svelte'),
          "children": []
        },
        {
          "meta": {},
          "id": "_default_y_character",
          "name": "character",
          "module": false,
          "file": {
            "path": "src/routes/y/character",
            "dir": "src/routes/y",
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
              "id": "_default_y_character__id__svelte",
              "name": "[id]",
              "file": {
                "path": "src/routes/y/character/[id].svelte",
                "dir": "src/routes/y/character",
                "base": "[id].svelte",
                "ext": ".svelte",
                "name": "[id]"
              },
              "asyncModule": () => import('../src/routes/y/character/[id].svelte'),
              "children": []
            }
          ]
        },
        {
          "meta": {
            "isDefault": true
          },
          "id": "_default_y_index_svelte",
          "name": "index",
          "file": {
            "path": "src/routes/y/index.svelte",
            "dir": "src/routes/y",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "asyncModule": () => import('../src/routes/y/index.svelte'),
          "children": []
        },
        {
          "meta": {},
          "id": "_default_y_privacy_policy",
          "name": "privacy-policy",
          "module": false,
          "file": {
            "path": "src/routes/y/privacy-policy",
            "dir": "src/routes/y",
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
              "id": "_default_y_privacy_policy__id__svelte",
              "name": "[id]",
              "file": {
                "path": "src/routes/y/privacy-policy/[id].svelte",
                "dir": "src/routes/y/privacy-policy",
                "base": "[id].svelte",
                "ext": ".svelte",
                "name": "[id]"
              },
              "asyncModule": () => import('../src/routes/y/privacy-policy/[id].svelte'),
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