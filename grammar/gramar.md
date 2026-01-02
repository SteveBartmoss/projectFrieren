
```bash
program -> table_decl+
table_decl -> "table" IDENT "{" column_decl* "}" ";"
column_decl -> IDENT type "(" NUM ")" ";"
type -> "int" | "string"
```
