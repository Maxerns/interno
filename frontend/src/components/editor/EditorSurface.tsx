import { useEffect, useRef } from 'react';                                               
    import { EditorView, basicSetup } from 'codemirror';                                     
    import { FileService } from '../../../bindings/github.com/Maxerns/interno';              
                                                                                             
    interface EditorSurfaceProps {                                                           
      path: string;                                                                          
    }                                                                                        
                                                                                             
    const EditorSurface: React.FC<EditorSurfaceProps> = ({ path }) => {                      
      const containerRef = useRef<HTMLDivElement | null>(null);                              
                                                                                             
      useEffect(() => {                                                                      
        let view: EditorView | null = null;                                                  
        let cancelled = false;                                                               
                                                                                             
        FileService.ReadFile(path).then((text) => {                                          
          if (cancelled || !containerRef.current) return;                                    
          view = new EditorView({                                                            
            doc: text ?? '',                                                                 
            extensions: [basicSetup],                                                        
            parent: containerRef.current,                                                    
          });                                                                                
        });                                                                                  
                                                                                             
        return () => {                                                                       
          cancelled = true;                                                                  
          view?.destroy();                                                                   
        };                                                                                   
      }, [path]);                                                                            
                                                                                             
      return <div ref={containerRef} style={{ height: '100%' }} />;                          
    };                                                                                       
                                                                                             
    export default EditorSurface;  