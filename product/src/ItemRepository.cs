using System;
using System.Collections.Generic;
using System.Linq;

namespace product {
    public class ItemRepository : IItemRepository{
        private static IList<Item> _item = new List<Item>();
        
        public Item GetItem(long id){
            return _item.FirstOrDefault(x => x.Id == id);
        }       

        public IEnumerable<Item> GetAll(){
            return _item;
        }
        public void Save(Item item) {
            if (_item.FirstOrDefault(x => x.Id == item.Id) is not null)
                throw new Exception("The item already exists");
            _item.Add(item);
        }
        public void Delete(long id)
        {
        }
    }
}