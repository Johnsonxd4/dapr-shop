using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace product.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase {
       
        private readonly ILogger<ProductsController> _logger;
        private readonly IItemRepository _itemRepository;
        
        public ProductsController(ILogger<ProductsController> logger, IItemRepository itemRepository) {
            _logger = logger;
            _itemRepository = itemRepository;
        }

        [HttpGet]
        public IEnumerable<Item> Get() {
            _logger.LogInformation("getting the products");
            return _itemRepository.GetAll();    
        }

        [HttpPost]
        public void Post([FromBody]Item item){
            _logger.LogInformation("Creating a brand new product");
            _itemRepository.Save(item);
        }
    }
}
