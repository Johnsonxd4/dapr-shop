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
            _item.Add(item);
        }
        public void Delete(long id)
        {
        }
    }
}