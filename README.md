# labeler

AI powered Annotation web platform

## Features

6. Dataset management.(Import, Explorer, Transform, Export)

{
  title,
  description,
  tags,
  count,
  size,
  createdAt,
  updatedAt,
  author,
  license,
  type: 'image', // 'video', 'text', 'audio'
  format: '',
  samples: [
    {
      id: 'uuid',
      title: '',
      filepath: 'xxx',
      property: {
        width: 0,
        height: 0,
      },
    }
  ],
}

2. Users and role management. 

{
  name,
  password,
  email,
  roles
}

5. Task management. (Distribute run job)

{
  id,
  title,
  type: 'label', 'autolabel',
  params: {
    datasetId,
    presetId,
  },
  triggeredBy,
  abortedBy,
  status,
  progress,
  message,
  startedAt,
  finishedAt,
}

3. Preset/Schema management.

{
  title,
  description,
  schema: [{}],
}

7. Plugins management. (Vision models services for auto labeling)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```


# 目标：实现path的编辑

1. 一个点一个点的创建，创建过程中不闭合曲线；
2. 创建完成一个点之后，可以转换为贝塞尔曲线的，从这个点拉出一个控制点出来，改变的始终是控制点；