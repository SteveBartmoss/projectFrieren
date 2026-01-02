
```bash
program -> table_decl+
table_decl -> "table" IDENT "{" column_decl* "}" ";"
column_decl -> IDENT type column_size? column_modifier* ";"
column_size -> "(" NUM ")"
column_modify -> "increment" | "null" | "primary"  | "not_null"
type -> "int" | "string"
```
