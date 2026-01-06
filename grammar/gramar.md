
### Gramatica

```bash
program -> table_decl+
table_decl -> "table" IDENT "{" table_item* "}" ";"
table_item -> column_decl | relation_decl
column_decl -> IDENT type column_size? column_modifier* ";"
column_size -> "(" NUM ")"
column_modifier -> "increment" | "null" | "not_null" | "primary"
type -> "int" | "string"
relation_decl -> "relation" IDENT "(" IDENT ")" "to" IDENT "(" IDENT ")" ";"
```

### AST

```js
Program {
  tables: [
    Table {
      name: "user",
      columns: [
        Column {
          name: "id",
          type: INT,
          size: null,
          modifiers: [INCREMENT, PRIMARY]
        },
        Column {
          name: "name",
          type: STRING,
          size: 20,
          modifiers: [NULL]
        },
        Column {
          name: "department_id",
          type: INT,
          size: null,
          modifiers: []
        }
      ],
      relations: [
        Relation {
          localColumn: "department_id",
          targetTable: "departments",
          targetColumn: "id"
        }
      ]
    }
  ]
}
```


