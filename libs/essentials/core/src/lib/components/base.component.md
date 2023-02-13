# BaseComponent

Base Component for all components in the App.

## Usage

1. Extend the BaseComponent
1. If you have a subscription in the form you can use the following code to monitor and destroy it.

```
this.subscription = this.api.GetList().subscribe(res => { this.variableName = res; });
```

1. If you have a subscription in the form you can use the alternate following code to monitor and destroy it.

```
this.api.GetList().pipe(takeUntil(this.destory)).subscribe(res => { this.variableName = res; });
```
