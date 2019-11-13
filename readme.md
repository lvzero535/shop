### typeorm
- 1、子表设置外键要删除父表时，要在子表映射关系时指定 onDelete: 'CASCADE',不然无法删除父表数据